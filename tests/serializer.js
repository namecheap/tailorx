'use strict';

const assert = require('assert');
const parse5 = require('parse5');
const adapter = require('parse5-htmlparser2-tree-adapter');
const CustomSerializer = require('../lib/serializer');

describe('Serializer', () => {
    const defaultOpts = {
        treeAdapter: adapter,
        slotMap: new Map(),
        handleTags: ['x-tag', 'fragment', 'text/template']
    };
    const getSerializer = (template, fullRendering = true) => {
        const rootNode = parse5.parse(template, { treeAdapter: adapter });
        const serializerOpts = Object.assign({}, defaultOpts, {
            fullRendering
        });
        return new CustomSerializer(rootNode, serializerOpts);
    };

    it('should output serialized buffer array', () => {
        const template = '<blah></blah>';
        const serializedList = getSerializer(template).serialize();
        assert(serializedList instanceof Array);
    });

    it('should output placeholder and closing tags for handle tags', () => {
        const template = '<x-tag></x-tag>';
        const serializedList = getSerializer(template).serialize();
        assert.deepEqual(serializedList[1], { attributes: {}, name: 'x-tag' });
        assert.deepEqual(serializedList[2], { closingTag: 'x-tag' });
    });

    it('should serialize attributes and child nodes inside handle tags', () => {
        const template = '<x-tag foo="bar"><div>hello</div></x-tag>';
        const serializedList = getSerializer(template).serialize();
        assert.deepEqual(serializedList[1], {
            attributes: { foo: 'bar' },
            name: 'x-tag'
        });
        assert.equal(serializedList[2], '<div>hello</div>');
        assert.deepEqual(serializedList[3], { closingTag: 'x-tag' });
    });

    it('should insert async placeholder before end of body tag', () => {
        const template = '<body><x-tag></x-tag></body>';
        const serializedList = getSerializer(template).serialize();
        assert.equal(
            serializedList[0].toString().trim(),
            '<html><head></head><body>'
        );
        assert.deepEqual(serializedList[3], { placeholder: 'async' });
        assert.equal(serializedList[4].toString().trim(), '</body></html>');
    });

    it('should not insert palceholders for partial rendering', () => {
        const template = '<script></script><x-tag></x-tag>';
        const serializedList = getSerializer(template, false).serialize();
        assert.equal(
            serializedList[0].toString(),
            '<html><head><script></script></head><body>'
        );
        assert.deepEqual(serializedList[1], { name: 'x-tag', attributes: {} });
        assert.deepEqual(serializedList[2], { closingTag: 'x-tag' });
        assert.equal(serializedList[3].toString(), '</body></html>');
    });

    it('should support script based custom tags for inserting in head', () => {
        const template =
            '<script type="fragment" primary async src="https://example.com"></script>';
        const serializedList = getSerializer(template).serialize();
        assert.equal(serializedList[0].toString().trim(), '<html><head>');
        assert.deepEqual(serializedList[1], {
            name: 'fragment',
            attributes: {
                type: 'fragment',
                primary: '',
                async: '',
                src: 'https://example.com'
            },
            textContent: ''
        });
        assert.equal(
            serializedList[3].toString().trim(),
            '</head><body></body></html>'
        );
    });

    it('should not serialize script tags that are not text/javascript', () => {
        const template =
            '<script type="text/template">console.log("yo")</script>';
        const serializedList = getSerializer(template).serialize();
        assert.equal(serializedList[0].toString().trim(), '<html><head>');
        assert.deepEqual(serializedList[1], {
            name: 'text/template',
            attributes: { type: 'text/template' },
            textContent: 'console.log("yo")'
        });
        assert.equal(
            serializedList[3].toString().trim(),
            '</head><body></body></html>'
        );
    });
});
