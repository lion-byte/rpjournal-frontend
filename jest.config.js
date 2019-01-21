module.exports = {
  projects: [
    './test/jest.lint.js',
    './src/backend/jest.config.js',
    './src/frontend/jest.config.js'
  ],
  testPathIgnorePatterns: ['node_modules/', '.cache/', 'coverage/']
}
