import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node'; // ✅ adaptador para modo server

export default defineConfig({
    site: 'https://aurablock.org',
    output: 'server',
    adapter: node({ mode: 'standalone' }), // ✅ necesario para server
    integrations: [react(), tailwind(), sitemap()],
});
