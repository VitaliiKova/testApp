process.env.NODE_ENV = 'UNITTEST';
module.exports = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        './src/**/*.ts'
    ],
    coveragePathIgnorePatterns: [
        "<rootDir>/src/index.ts",
    ],
    coverageDirectory: '<rootDir>/test/coverage',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    preset: 'ts-jest'
};