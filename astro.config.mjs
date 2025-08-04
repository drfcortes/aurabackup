import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless'; // 👈 Nuevo

export default defineConfig({
    site: 'https://aurablock.org',
    output: 'server', // SSR
    adapter: vercel(), // 👈 Usar adaptador de Vercel
    integrations: [react(), tailwind(), sitemap()],
});
