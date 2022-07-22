import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: undefined,
  clean: true,
  splitting: false,
  dts: true
});
