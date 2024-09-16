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
  },
  devServer: {
    port: 19191,
  },
}
