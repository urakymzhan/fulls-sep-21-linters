module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 13,
    },
    rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single', { avoidEscape: true }],
        'no-var': 'error',
        'prefer-const': 'error',
    },
};
