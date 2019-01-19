module.exports = {
  ...require('./jest.common'),
  displayName: 'backend',
  testEnvironment: 'jest-environment-node',
  testMatch: [
    '**/backend**/__tests__/**/*.js',
    '**/backend/**/?(*.)+(spec|test).js'
  ]
}
