import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

import json from '@rollup/plugin-json';

export default defineConfig({
  input: [],
  output: {

  },
  plugins: [
    json(),
    esbuild({
      target: 'node14'
    })
  ]
});
