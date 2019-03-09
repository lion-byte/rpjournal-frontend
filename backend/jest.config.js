module.exports = {
  displayName: 'backend',
  testEnvironment: 'jest-environment-node',
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**'
  ]
}
