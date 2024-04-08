const config = require('../jest.config');

const tsconfig = require('./tsconfig.json');
const tsPaths = require('tsconfig-paths-jest')(tsconfig);

/** @type {import('jest').Config} */
module.exports = {
  ...config,
  testEnvironment: '@happy-dom/jest-environment',
  setupFilesAfterEnv: ['<rootDir>/jest/setup.ts'],
  moduleNameMapper: tsPaths,
};
