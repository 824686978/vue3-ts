module.exports = {
  outputDir: './build',
  publicPath: './',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      require('unplugin-vue-components/webpack')({
        /* options */
      }),
      require('unplugin-auto-import/webpack')({
        /* options */
      })
    ],
    resolve: {
      alias: {
        views: '@/views',
        assets: '@/assets',
        components: '@/components'
      }
    }
  }
}
