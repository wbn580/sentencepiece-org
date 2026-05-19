import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://xgboost.org',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
