module.exports = {
  ...require('./jest.common'),
  displayName: 'frontend',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '**/frontend**/__tests__/**/*.js',
    '**/frontend/**/?(*.)+(spec|test).js'
  ],
  coveragePathIgnorePatterns: ['.cache/', 'node_modules/'],
  globals: {
    __PATH_PREFIX__: ''
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': require.resolve(
      '../src/frontend/__mocks__/file-mock.js'
    )
  },
  setupFiles: [require.resolve('./loadershim.js')],
  testPathIgnorePatterns: ['.cache/', 'node_modules/'],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.js$': require.resolve('./babel-setup.js')
  },
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)']
}
