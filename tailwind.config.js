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
        'main-yellow': '#FFF9E2',
        'main-green': '#DDEBCA',
        'main-brown': '#827157',
        'attention-pink': '#E784BB',
        'money-blue': {
          default: '#39B7AE',
          dark: '#26827b'
        },
        green: {
          ...colors.green,
          '550': '#85AD75'
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
