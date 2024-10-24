'use strict';

/**
 * @type {import('lint-staged').Config}
 */
module.exports = {
    '*': 'prettier --ignore-unknown --write',
    '*.js': 'npm run fix'
};
