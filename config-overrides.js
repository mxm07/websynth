const path = require('path')

module.exports = function override(config) {
 return {
    ...config, 
    resolve: {
      ...config.resolve,
      alias: {
        'Components': path.resolve(__dirname, './src/components'),
        'Utils': path.resolve(__dirname, './src/utils'),
        'Audio': path.resolve(__dirname, './src/audio'),
        'Assets': path.resolve(__dirname, './src/assets')
      }
    }
  }
}
