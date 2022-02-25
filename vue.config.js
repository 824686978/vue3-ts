module.exports = {
  outputDir: './build',
  publicPath: './',
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
