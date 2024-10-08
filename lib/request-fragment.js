'use strict';

const http = require('http');
const https = require('https');
const url = require('url');
const Agent = require('agentkeepalive');
const HttpsAgent = require('agentkeepalive').HttpsAgent;
const { globalTracer, FORMAT_HTTP_HEADERS } = require('opentracing');
const tracer = globalTracer();

// By default tailor supports gzipped response from fragments
const requiredHeaders = {
    'accept-encoding': 'gzip, deflate'
};

const kaAgent = new Agent();
const kaAgentHttps = new HttpsAgent();

/**
 * Simple Request Promise Function that requests the fragment server with
 *  - filtered headers
 *  - Specified timeout from fragment attributes
 *
 * @param {filterHeaders} - Function that handles the header forwarding
 * @param {processFragmentResponse} - Function that handles response processing
 * @param {string} fragmentUrl - URL of the fragment server
 * @param {Object} fragmentAttributes - Attributes passed via fragment tags
 * @param {Object} request - HTTP request stream
 * @param {Object} span - opentracing span context passed for propagation
 * @returns {Promise} Response from the fragment server
 */
module.exports =
    (filterHeaders, processFragmentResponse) =>
    (fragmentUrl, fragmentAttributes, request, span = null) =>
        new Promise((resolve, reject) => {
            const parsedUrl = url.parse(fragmentUrl);
            const options = Object.assign(
                {
                    headers: Object.assign(
                        filterHeaders(fragmentAttributes, request),
                        requiredHeaders
                    ),
                    timeout: fragmentAttributes.timeout
                },
                parsedUrl
            );

            if (span) {
                tracer.inject(
                    span.context(),
                    FORMAT_HTTP_HEADERS,
                    options.headers
                );
            }

            const { protocol: reqProtocol, timeout } = options;
            const hasHttpsProtocol = reqProtocol === 'https:';
            const protocol = hasHttpsProtocol ? https : http;
            options.agent = hasHttpsProtocol ? kaAgentHttps : kaAgent;

            if (hasHttpsProtocol && fragmentAttributes.ignoreInvalidSsl) {
                options.rejectUnauthorized = false;
            }

            const fragmentRequest = protocol.request(options);

            if (timeout) {
                fragmentRequest.setTimeout(timeout, fragmentRequest.abort);
            }

            fragmentRequest.on('response', response => {
                try {
                    resolve(
                        processFragmentResponse(response, {
                            request,
                            fragmentUrl,
                            fragmentAttributes
                        })
                    );
                } catch (e) {
                    reject(e);
                }
            });
            fragmentRequest.on('error', reject);
            fragmentRequest.end();
        });
