/* vue.config.js – optimised for Vue 2 + Vuetify */
const CompressionPlugin = require('compression-webpack-plugin') // gzip
const { VueLoaderPlugin } = require('vue-loader')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  /* 1.  Don't ship the template compiler in production
        (≈10 kB gzipped).  Keep it in dev because it's handy.          */
  runtimeCompiler: process.env.NODE_ENV !== 'production',

  /* 2.  Disable source-maps in prod (-20 kB‒60 kB).                   */
  productionSourceMap: false,

  /* 3.  Extract CSS, but also drop duplicated rules.                  */
  css: {
    extract: { ignoreOrder: true },
  },

  /* 4.  One single entry, but let Vue CLI create vendor/common chunks
        so the browser can cache them.*                                */
  pages: {
    index: {
      entry: 'src/index.js',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
  },

  /* 5.  Anything you load from a CDN shouldn't be in the bundle.      */
  configureWebpack: (env) => ({
    externals: env.production
      ? {
          vue: 'Vue',
          vuetify: 'Vuetify',
        }
      : {},
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: { drop_console: true },
            output: { comments: false },
          },
          extractComments: false,
        }),
      ],
      splitChunks: {
        chunks: 'all',
        maxSize: 240 * 1024,
      },
    },
    plugins: [
      new CompressionPlugin({
        test: /\.(js|css|html|svg)$/,
        algorithm: 'gzip',
        compressionOptions: { level: 9 },
        threshold: 10 * 1024,
        minRatio: 0.8,
      }),
    ],
  }),

  /* Dev server settings */
  devServer: {
    port: 19191,
  },

  /* Add vue-loader configuration */
  chainWebpack: (config) => {
    config.module.rule('vue').use('vue-loader').loader('vue-loader')
  },

  transpileDependencies: ['vuetify'],
}
