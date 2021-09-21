process.env.NODE_ENV = 'UNITTEST';
module.exports = {
    clearMocks: true,
    testEnvironment: 'node',
    testMatch: ['**/*.e2e.test.ts'],
    preset: 'ts-jest'
};