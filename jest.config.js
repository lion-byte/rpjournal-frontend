module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  globals: {},
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': require.resolve(
      './__mocks__/file-mock.js'
    )
  },
  setupFiles: ['<rootDir>/loadershim.js'],
  collectCoverageFrom: ['<rootDir>/**/*.js'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'coverage',
    '.next',
    '.storybook',
    '<rootDir>/stories/',
    '<rootDir>/pages/'
  ],
  testPathIgnorePatterns: [
    'node_modules',
    'coverage',
    '.next',
    '.storybook',
    '<rootDir>/stories/',
    '<rootDir>/pages/'
  ],
  projects: [
    {
      displayName: 'test'
    },
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/**/*.js']
    }
  ]
}
