module.exports = {
  displayName: 'frontend',
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/node_modules/**',
    '!**/.cache/**',
    '!**/coverage/**'
  ],
  globals: {
    __PATH_PREFIX__: ''
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': require.resolve(
      './__mocks__/file-mock.js'
    )
  },
  setupFiles: [require.resolve('./loadershim.js')],
  testPathIgnorePatterns: ['node_modules', '.cache', 'coverage'],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.jsx?$': require.resolve('./jest-preprocess.js')
  },
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)']
}
