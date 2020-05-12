export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'ja'
    },
    title: 'カブ価予報 | あつまれど うぶつの森',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'content-language', content: 'ja' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          '今週のカブ価予報をおとどけします。火曜日の午後ごろまで入力するとそれなりなカブ価予報となるでしょう。'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/disqus', '~/plugins/utils'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-webfontloader'
  ],
  devModules: ['@nuxtjs/tailwindcss'],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  webfontloader: {
    google: {
      families: ['Kosugi Maru'],
      urls: [
        'https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=auto'
      ]
    }
  },

  pwa: {
    meta: {
      appleStatusBarStyle: 'black-translucent'
    },
    manifest: {
      name: 'カブ価予報 | あつまれど うぶつの森',
      title: 'カブ価予報 | あつまれど うぶつの森',
      'og:title': 'カブ価予報 | あつまれど うぶつの森',
      description:
        '今週のカブ価予報をおとどけします。火曜日の午後ごろまで入力するとそれなりなカブ価予報となるでしょう。',
      'og:description':
        '今週のカブ価予報をおとどけします。火曜日の午後ごろまで入力するとそれなりなカブ価予報となるでしょう。',
      lang: 'ja',
      theme_color: '#FFF9E2',
      background_color: '#FFF9E2',
      display: 'fullscreen'
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    terser: {
      terserOptions: {
        compress: { drop_console: true }
      }
    }
  }
}
