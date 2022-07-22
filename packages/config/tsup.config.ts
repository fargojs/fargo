import { defineConfig } from 'tsup';

import YAMLPlugin from '@zotera/esbuild-yaml';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  clean: true,
  splitting: false,
  dts: true,
  esbuildPlugins: [
    YAMLPlugin({
      output: 'text'
    })
  ]
});
