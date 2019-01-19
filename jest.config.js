module.exports = {
  ...require('./test/jest.common'),
  collectCoverageFrom: ['**/src/**/*.js'],
  // coverageThreshold: {
  //   global: {
  //     statements: 17,
  //     branches: 4,
  //     functions: 20,
  //     lines: 17
  //   }
  // },
  projects: ['./test/jest.backend.js', './test/jest.frontend.js']
}
