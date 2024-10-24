import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';

export default [
    {
        ignores: [
            'eslint.config.js',
            'prettier.config.js',
            '**/coverage',
            'examples/fragment-performance/hooks.js',
            'examples/fragment-performance/test.js'
        ]
    },
    {
        plugins: {
            prettier
        },

        languageOptions: {
            globals: {
                ...Object.fromEntries(
                    Object.entries(globals.browser).map(([key]) => [key, 'off'])
                ),
                ...globals.node,
                require: false,
                module: false
            },

            parser: babelParser,
            ecmaVersion: 6,
            sourceType: 'script',

            parserOptions: {
                requireConfigFile: false
            }
        },

        rules: {
            curly: 2,
            'no-underscore-dangle': 0,
            'no-constant-condition': 2,
            'no-dupe-args': 2,
            'no-debugger': 2,
            'no-duplicate-case': 2,
            'no-empty': 2,
            'no-empty-character-class': 2,
            'no-eval': 2,
            'no-unused-vars': 2,
            'no-lonely-if': 2,
            quotes: [0, true, 'single'],
            strict: [2, 'global'],

            'prettier/prettier': [
                2,
                {
                    singleQuote: true,
                    tabWidth: 4
                }
            ]
        }
    }
];
