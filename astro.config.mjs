import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sentencepiece.org',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
