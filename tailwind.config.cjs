/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/**/*.{astro,js,jsx,ts,tsx,vue,svelte}',
        './components/**/*.{astro,js,jsx,ts,tsx}',
        './layouts/**/*.{astro,js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                aura: {
                    green: '#636b3f',
                    deep: '#2b361c',
                    yellow: '#fefae3',
                    sepia: '#d4a369',
                    leather: '#b17036',
                    soft: '#f9f9f6',
                    beige: '#eceadf',
                    black: '#1a1a1a',
                    gray: '#5e5e5e',
                    white: '#ffffff',
                    olive: '#8b8f66',
                    cream: '#fbf9ee'
                }
            },
            fontSize: {
                base: '1.125rem',
                lg: '1.25rem'
            },
            fontFamily: {
                sans: ['Noto Sans', 'sans-serif']
            }
        }
    },
    plugins: []
};
