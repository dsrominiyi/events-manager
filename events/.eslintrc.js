module.exports = {
  extends: ['next', 'airbnb', 'airbnb-typescript', '../.eslintrc.js'],
  settings: {
    'import/resolver': {
      typescript: {
        project: `${__dirname}/tsconfig.json`,
      },
    },
  },
  rules: {
    'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }],

    // disable
    'react/function-component-definition': 'off',
    'react/require-default-props': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-array-index-key': 'off',
    'react-hooks/exhaustive-deps': 'off',

    'no-restricted-globals': 'off',
  },
};
