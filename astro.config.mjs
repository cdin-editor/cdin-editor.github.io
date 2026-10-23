// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// This repository is intended to be the cdin-editor organization Pages site.
export default defineConfig({
  site: 'https://cdin-editor.github.io',
  base: '/',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
});
