const title = 'カブ価予報 | あつまれど うぶつの森'
const description =
  '今週のカブ価予報をおとどけします。火曜日の午後ごろまで入力するとそれなりなカブ価予報となるでしょう。'
const url = 'https://turnip-forecast.netlify.app/'
const ogImage = `${url}/ogp.png`

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'ja'
    },
    title,
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'content-language', content: 'ja' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: description
      },
      { hid: 'ogTitle', property: 'og:title', content: title },
      { hid: 'ogType', property: 'og:type', content: 'website' },
      { hid: 'ogUrl', property: 'og:url', content: url },
      {
        hid: 'ogImage',
        property: 'og:image',
        content: ogImage
      },
      { property: 'og:site_name', content: title },
      {
        hid: 'ogDescription',
        property: 'og:description',
        content: description
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitterSite', name: 'twitter:site', content: title },
      { hid: 'twitterUrl', name: 'twitter:url', content: url },
      { hid: 'twitterTitle', name: 'twitter:title', content: title },
      {
        hid: 'twitterDescription',
        name: 'twitter:description',
        content: description
      },
      {
        hid: 'twitterImage',
        name: 'twitter:image:src',
        content: ogImage
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
    'nuxt-webfontloader',
    [
      '@nuxtjs/google-gtag',
      {
        id: process.env.GAID,
        debug: true
      }
    ]
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
      name: title,
      title,
      'og:title': title,
      description,
      'og:description': description,
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
