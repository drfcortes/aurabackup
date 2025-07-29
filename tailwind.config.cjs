/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{astro,js,jsx,ts,tsx,vue,svelte}',
        './components/**/*.{astro,js,jsx,ts,tsx}',
        './layouts/**/*.{astro,js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                aura: {
                    fontSize: {
                        fontFamily: {

                            // Paleta original
                            green: '#636b3f',
                            deep: '#2b361c',
                            yellow: '#fefae3',
                            sepia: '#d4a369',
                            leather: '#b17036',

                            // Variantes nuevas
                            soft: '#f9f9f6',           // Fondo casi blanco
                            beige: '#eceadf',          // Alternativa neutral clara
                            black: '#1a1a1a',          // Negro moderno (para headers si lo deseas)
                            gray: '#5e5e5e',           // Gris intermedio
                            white: '#ffffff',          // Blanco puro
                            olive: '#8b8f66',          // Verde oliva (complementario)
                            cream: '#fbf9ee',          // Alternativa muy suave de fondo


                            base: '1.125rem', // equivale a 18px en lugar de 16px
                            lg: '1.25rem',

                            sans: ['Noto Sans', 'sans-serif'],
                        }
                    }
                }
            }
        }
    },
    plugins: []
}
