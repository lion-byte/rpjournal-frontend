const { createTransformer } = require('babel-jest')

const babelOptions = {
  presets: ['babel-preset-gatsby'],
  plugins: ['styled-components']
}

module.exports = createTransformer(babelOptions)
