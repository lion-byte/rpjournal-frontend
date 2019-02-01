const withCSS = require('@zeit/next-css')
const withFonts = require('next-fonts')
const withSourceMaps = require('@zeit/next-source-maps')

module.exports = withSourceMaps(withCSS(withFonts()))
