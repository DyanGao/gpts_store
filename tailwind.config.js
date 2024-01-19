/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background': 'radial-gradient(circle , #0a0a0a 0.5px, transparent 0.8px)',
        'background-size': '20px 20px'
      },
    },
    container: {
      center: true,
      screens: {
      'sm': '600px',
      'md': '728px',
      'lg': '984px',
      'xl': '1240px',
      '2xl': '1300px',// => @media (min-width: 1536px) { ... }
    }
    },
    borderColor: {
      default: 'black'
    },
    plugins: [],
  }
}