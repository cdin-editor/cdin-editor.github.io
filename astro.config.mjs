// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // This repository is a project site, so GitHub Pages serves it under /cdin.github.io/.
  site: 'https://cdin-editor.github.io',
  base: process.env.GITHUB_ACTIONS === 'true' ? '/cdin.github.io' : '/',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});