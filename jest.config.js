// jest.config.js
export default {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/server.js',
        '!src/config/**'
    ],
    testMatch: [
        '**/tests/**/*.test.@(js|mjs)',
        '**/__tests__/**/*.test.@(js|mjs)'
    ],
    testTimeout: 10000,
    verbose: true,
    transform: {},
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1'
    }
};
