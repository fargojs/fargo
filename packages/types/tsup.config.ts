import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/api.ts'],
  clean: true,
  dts: {
    only: true
  }
});
