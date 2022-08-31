import fetch from 'node-fetch';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

const defaultZoteraWebOptions = {
  title: 'Zotera',
  footer: {
    message: 'Powered by Zotera',
    copyright: 'Copyright © 2022'
  }
};

export default defineConfig(async () => {
  let options = defaultZoteraWebOptions;
  try {
    options = await (await fetch('http://localhost:4000/__zotera_options__')).json() as typeof defaultZoteraWebOptions;
  } catch (e) {
    console.error('Could not fetch Zotera web options, using default options for development.');
  }

  return {
    plugins: [react()],
    define: {
      'window.__ZOTERA_OPTIONS': options
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
