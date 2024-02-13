/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html"
  ],
  theme: {
    fontFamily:{
      main: ['Poppins', 'sans-serif']
    },
    listStyleType:{
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman'
    },
    extend: {
      width:{
        main: '1220px'
      },
      backgroundColor:{
        main: '#ee3131'
      },
      colors: {
        main: '#ee3131',
        opacity: 'rgba(255, 255, 255, 0.3)'
      },
      keyframes: {
        'slide-top': {
          '0%':{
            '-webkit-transform': 'translateY(40px);',
            transform: 'translateY(40px);'
          },
          '100%': {
            '-webkit-transform': 'translateY(0px);',
            transform: 'translateY(0px);'
          }
        },
        'slideInFromTop': {
          '0%':{
            '-webkit-transform': 'translateY(-35%);',
            transform: 'translateY(-35%);'
          },
          '100%': {
            '-webkit-transform': 'translateY(0px);',
            transform: 'translateY(0px);'
          }
        },
        'slideInFromBottom': {
          '0%':{
            '-webkit-transform': 'translateY(0);',
            transform: 'translateY(0);'
          },
          '100%': {
            '-webkit-transform': 'translateY(-100%);',
            transform: 'translateY(-100%);'
          }
        }
      },
      animation: {
        'slide-top': 'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slideInFromTop': 'slideInFromTop 0.7s ease-out',
        'slideInFromBottom': 'slideInFromBottom 0.5s ease-out'
      }
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp")
  ],
}