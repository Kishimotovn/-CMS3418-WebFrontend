const { join } = require('path')
module.exports = {
  router: {
    middleware: 'authenticate'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Advanced Software Development - Assignment 1',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
      // { rel: 'stylesheet', href: '~/node_modules/mdi/css/materialdesignicons.min.css', media: 'all', type: 'text/css'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  css: [
    { src: join(__dirname, 'css/app.styl'), lang: 'styl' }
  ],

  plugins: [
    '~plugins/vue-axios',
    '~plugins/vuetify.js',
    { src: '~plugins/vue-dropzone.js', ssr: false },
    { src: '~plugins/vue-datepicker.js', ssr: false }
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    vendor: ['axios', 'vuetify', 'bulma'],
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
