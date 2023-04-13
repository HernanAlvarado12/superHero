/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.{html,js}'],
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    extend: {
      screens: {
        'bs': '900px'
      },
      spacing: {
        '0.5': '0.5rem',
        '1': '1rem',
        '1.5': '1.5rem',
        '2': '2rem',
        '2.5': '2.5rem',
        '3': '3rem',
        '3.5': '3.5rem',
        '4': '4rem',
        '5': '5rem',
        '6': '6rem',
        '8': '8rem',
        '10': '10rem',
        '50': '50%',
        '85': '85%',
        '90': '90%'
      },
      fontSize: {
        'xss': '1.2rem',
        'xs': '1.4rem',
        'sm': '1.6rem',
        'md': '1.8rem',
        'base': '2.4rem',
        'lg': '3.2rem',
        'xl': '4.2rem'
      },
      borderRadius: {
        sm: '0.6rem',
        md: '0.8rem',
        lg: '1rem',
        xl: '6rem'
      },
      colors: {
        white: '#fff',
        red: '#f64445',
        grey: '#505050',
        black: '#0a0a0a',
        yellow: '#f2c10e',
        purple: '#611cac'
      },
      backgroundImage: {
        main: 'linear-gradient(170deg, #f64445 0%, #611cac 100%)'
      }
    },
  },
  plugins: [],
}

