import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: ['cjs'],
  clean: true,
  bundle: false,
  splitting: false,
  dts: true
});
