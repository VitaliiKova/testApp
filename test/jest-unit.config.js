process.env.NODE_ENV = 'UNITTEST';
module.exports = {
    clearMocks: true,
    testEnvironment: 'node',
    testMatch: ['**/*.unit.test.ts'],
    preset: 'ts-jest'
};