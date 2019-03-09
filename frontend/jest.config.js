module.exports = {
  displayName: 'frontend',
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**'
  ],
  globals: {},
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': require.resolve(
      './__mocks__/file-mock.js'
    )
  },
  setupFiles: [require.resolve('./loadershim.js')],
  testPathIgnorePatterns: ['node_modules', 'coverage'],
  testURL: 'http://localhost',
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)']
}
