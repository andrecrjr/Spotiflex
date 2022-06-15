const {defaults} = require('jest-config');

module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    "transform": {
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    "^.+\\.(css|less|scss)$": "babel-jest"
    },
    testEnvironment: 'jest-environment-jsdom',
  };