'use strict';

const options = {
    url: 'http://localhost:8080',
    maxRequests: 5000,
    concurrency: 100
};

(async function () {
    try {
        const { loadTest } = await import('loadtest');
        const result = await loadTest(options);
        result.show();
    } catch (err) {
        console.error('LoadTest Error', err);
    }
})();
