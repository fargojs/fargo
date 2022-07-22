import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  splitting: true,
  dts: {
    only: true,

  }
});
