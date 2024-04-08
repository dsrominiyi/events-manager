const config = require('./jest.config');

/** @type {import('jest').Config} */
module.exports = {
  ...config,
  roots: ['<rootDir>/test'],
  setupFiles: ['<rootDir>/test/helpers/setupEnv.ts'],
};
