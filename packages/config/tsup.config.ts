import { defineConfig } from 'tsup';

import YAMLPlugin from '@zotera/esbuild-yaml';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  clean: true,
  splitting: true,
  dts: true,
  outExtension() {
    return {
      js: '.js'
    };
  },
  esbuildPlugins: [
    YAMLPlugin({
      output: 'text'
    })
  ]
});
