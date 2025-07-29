/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontSize: {
                base: '18px', // ← sube de 16px (por defecto) a 18px
            },
            colors: {
                auraWine: '#4B2E39',
            }
        },
        plugins: [],
    }
};
