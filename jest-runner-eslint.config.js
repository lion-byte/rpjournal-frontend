const path = require('path')

module.exports = {
  cliOptions: {
    config: path.resolve(__dirname, './.eslintrc.json'),
    ignorePath: path.resolve(__dirname, './.gitignore')
  }
}
