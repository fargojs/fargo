import got from 'got';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig(async ({ mode }) => {
  const options = await got('http://localhost:4000/__zotera_web_options__').json();

  return {
    plugins: [react()],
    define: {
      'window.__ZOTERA_WEB_OPTIONS': options
    },
    server: {
      proxy: {
        '^/-/.*': {
          target: 'http://localhost:4000'
        }
      }
    }
  };
});
