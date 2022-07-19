import { copy } from 'esbuild-plugin-copy';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: ['cjs'],
  clean: true,
  bundle: false,
  splitting: false,
  dts: true,
  esbuildPlugins: [
    copy({
      assets: {
        keepStructure: true,
        from: ['src/templates/**/*'],
        to: ['templates']
      }
    })
  ]
});
