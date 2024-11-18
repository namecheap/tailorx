'use strict';

const stream = require('stream');

module.exports = class StringifierStream extends stream.Transform {
    constructor(primaryFragmentHeaders) {
        super({ objectMode: true });

        this.__title =
            primaryFragmentHeaders['x-head-title'] !== undefined
                ? Buffer.from(
                      primaryFragmentHeaders['x-head-title'],
                      'base64'
                  ).toString('utf-8')
                : '';
        this.__meta =
            primaryFragmentHeaders['x-head-meta'] !== undefined
                ? Buffer.from(
                      primaryFragmentHeaders['x-head-meta'],
                      'base64'
                  ).toString('utf-8')
                : '';

        this.__injected = false;
    }

    _transform(chunk, encoding, done) {
        if (this.__injected || (this.__title === '' && this.__meta === '')) {
            this.push(chunk);
            return done();
        }

        let schunk = chunk.toString();
        let insertPosStart, insertPosEnd;

        const titleMatch = schunk.indexOf('<title>');
        if (titleMatch !== -1) {
            insertPosStart = titleMatch;
            const titleClosingTag = '</title>';
            const titleClosingTagIndex = schunk.indexOf(
                titleClosingTag,
                insertPosStart
            );
            insertPosEnd =
                titleClosingTagIndex !== -1
                    ? titleClosingTagIndex + titleClosingTag.length
                    : undefined;
        } else {
            const pos = schunk.indexOf('</head>');
            if (pos !== -1) {
                insertPosStart = pos;
                insertPosEnd = insertPosStart;
            }
        }

        if (insertPosStart !== undefined && insertPosEnd !== undefined) {
            schunk =
                schunk.substring(0, insertPosStart) +
                this.__title +
                this.__meta +
                schunk.substring(insertPosEnd);
            this.__injected = true;
        }

        this.push(schunk);
        done();
    }
};
