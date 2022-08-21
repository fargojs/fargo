import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  clean: true,
  splitting: false,
  dts: true,
  // this only sets env to prod when minified, but we dont want to minify it.
  // so maybe we should monkey patch tsup to set env to prod when not watched.
  replaceNodeEnv: true,
});
