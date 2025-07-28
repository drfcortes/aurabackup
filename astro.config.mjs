import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://aurablock.org',
    integrations: [react(), tailwind(), sitemap()],
    output: 'static',
});
