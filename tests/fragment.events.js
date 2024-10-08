'use strict';
const assert = require('assert');
const nock = require('nock');
const sinon = require('sinon');
const Fragment = require('../lib/fragment');
const requestFragment = require('../lib/request-fragment');

const TAG = { attributes: { src: 'https://fragment' } };
const REQUEST = { headers: {} };
const RESPONSE_HEADERS = { connection: 'close' };
const filterHeaderFn = () => ({});
const processFragmentResponseFn = require('../lib/process-fragment-response');
const getOptions = tag => {
    return {
        tag,
        context: {},
        index: false,
        requestFragment: requestFragment(
            filterHeaderFn,
            processFragmentResponseFn
        )
    };
};

describe('Fragment events', () => {
    it('triggers `start` event', done => {
        nock('https://fragment').get('/').reply(200, 'OK');
        const fragment = new Fragment(getOptions(TAG));
        fragment.on('start', done);
        fragment.fetch(REQUEST);
    });

    it('triggers `response(statusCode, headers)` when received headers', done => {
        nock('https://fragment').get('/').reply(200, 'OK', RESPONSE_HEADERS);
        const fragment = new Fragment(getOptions(TAG));
        fragment.on('response', (statusCode, headers) => {
            assert.equal(statusCode, 200);
            assert.deepEqual(headers, RESPONSE_HEADERS);
            done();
        });
        fragment.fetch(REQUEST);
    });

    it('triggers `end(contentSize)` when the content is succesfully retreived', done => {
        nock('https://fragment').get('/').reply(200, '12345');
        const fragment = new Fragment(getOptions(TAG));
        fragment.on('end', contentSize => {
            assert.equal(contentSize, 5);
            done();
        });
        fragment.fetch(REQUEST);
        fragment.stream.resume();
    });

    it('triggers `error(error)` when fragment responds with 50x', done => {
        nock('https://fragment').get('/').reply(500);
        const fragment = new Fragment(getOptions(TAG));
        fragment.on('error', error => {
            assert.ok(error);
            done();
        });
        fragment.fetch(REQUEST);
    });

    it('should not trigger `response` and `end` if there was an `error`', done => {
        const onResponse = sinon.spy();
        const onEnd = sinon.spy();
        const onError = sinon.spy();
        nock('https://fragment').get('/').reply(500);
        const fragment = new Fragment(getOptions(TAG));
        fragment.on('response', onResponse);
        fragment.on('end', onEnd);
        fragment.on('error', onError);
        fragment.fetch(REQUEST);
        fragment.stream.on('end', () => {
            assert.equal(onResponse.callCount, 0);
            assert.equal(onEnd.callCount, 0);
            assert.equal(onError.callCount, 1);
            done();
        });
        fragment.stream.resume();
    });

    it('triggers `error(error)` when there is socket error', done => {
        const ERROR = {
            message: 'something awful happened',
            code: 'AWFUL_ERROR'
        };
        nock('https://fragment').get('/').replyWithError(ERROR);
        const fragment = new Fragment(getOptions(TAG));
        fragment.on('error', error => {
            assert.equal(error.message, ERROR.message);
            done();
        });
        fragment.fetch(REQUEST);
    });

    it('triggers `error(error)` when fragment times out', done => {
        nock('https://fragment').get('/').delayConnection(101).reply(200);
        const tag = { attributes: { src: 'https://fragment', timeout: '100' } };
        const fragment = new Fragment(getOptions(tag));
        fragment.on('error', err => {
            assert.equal(err.message, 'socket hang up');
            done();
        });
        fragment.fetch(REQUEST);
    });
});
