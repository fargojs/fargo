import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  clean: true,
  dts: true,
  outExtension() {
    return {
      js: '.js'
    };
  }
});
