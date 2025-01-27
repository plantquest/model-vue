const path = require('path');

module.exports = {
  runtimeCompiler: true,

  css: {
    extract: true,
  },

  pages: {
    index: 'src/index.js',
  },
  configureWebpack: {
    externals: /vuetify\/lib/,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
  },
  devServer: {
    // 'Access-Control-Allow-Origin': '*',
    port: 19191,
  },
}
