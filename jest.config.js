const {defaults} = require('jest-config');

module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    coveragePathIgnorePatterns: ['<rootDir>/next.config.js'],
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    "transform": {
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    "^@/mocks/(.*)$":"<rootDir>/__mocks__/$1",
    "^@/utils/(.*)$":"<rootDir>/utils/$1",
    "^.+\\.(css|less|scss)$": "babel-jest"
    },
    testEnvironment: 'jest-environment-jsdom',
  };