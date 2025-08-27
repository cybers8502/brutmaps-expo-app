module.exports = {
    root: true,
    extends: ['universe/native', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        'import/order': [
            'warn',
            {
                'groups': [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
                'newlines-between': 'always'
            }
        ],
    },
};
