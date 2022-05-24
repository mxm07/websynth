const path = require('path')

module.exports = function override(config) {
  process.env.WEBPACK_ENV = 'development'

  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        'Components': path.resolve(__dirname, './src/components'),
        'Constants': path.resolve(__dirname, './src/constants'),
        'Utils': path.resolve(__dirname, './src/utils'),
        'Audio': path.resolve(__dirname, './src/audio'),
        'Assets': path.resolve(__dirname, './src/assets')
      }
    }
  }
}
