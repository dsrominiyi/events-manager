const config = require('../jest.config');

const tsconfig = require('./tsconfig.json');
const tsPaths = require('tsconfig-paths-jest')(tsconfig);

/** @type {import('jest').Config} */
module.exports = {
  ...config,
  roots: ['<rootDir>/src'],
  moduleNameMapper: tsPaths,
};
