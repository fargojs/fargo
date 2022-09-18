import { copy } from 'esbuild-plugin-copy';
import { defineConfig } from 'tsup';

import { version } from './package.json';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  clean: true,
  splitting: false,
  dts: true,
  define: {
    __VERSION__: `'${version}'`
  },
  outExtension() {
    return {
      js: '.js'
    };
  },
  esbuildPlugins: [
    copy({
      assets: {
        keepStructure: true,
        from: ['templates/**/*'],
        to: ['templates']
      }
    })
  ]
});
