/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        'paper-yellow': '#fffff6',
        green: {
          ...colors.green,
          '400': '#8CD790'
        },
        yellow: {
          ...colors.yellow,
          '150': '#FFF9E2'
        }
      }
    },
    fontFamily: {
      body: ['"Kosugi Maru"']
    }
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}
