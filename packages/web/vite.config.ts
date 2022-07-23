import { resolve } from 'path';
import { defineConfig } from 'vite';

import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {},
    lib: {
      entry: resolve(__dirname, './src/main.ts'),
      name: '@zotera/web',
      formats: ['cjs', 'es'],
      // the proper extensions will be added
      fileName: 'zotera-web'
    }
  }
});
