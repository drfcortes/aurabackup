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
                    green: '#636b3f',        // Marine Green
                    deep: '#2b361c',         // Deep Green
                    yellow: '#fefae3',       // Barium Yellow
                    sepia: '#d4a369',        // Sepia
                    leather: '#b17036',      // Leather
                }
            }
        }
    },
    plugins: []
}
