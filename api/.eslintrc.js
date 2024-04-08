module.exports = {
  extends: '../.eslintrc.js',
  settings: {
    'import/resolver': {
      typescript: {
        project: `${__dirname}/tsconfig.json`,
      },
    },
  },
  rules: {
    'no-console': 'off',
    'max-classes-per-file': 'off',
  },
};
