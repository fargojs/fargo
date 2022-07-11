import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/commands/*.ts'],
  format: ['cjs'],
  clean: true,
  bundle: false,
  splitting: false,
  dts: true
});
