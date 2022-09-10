import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/types.ts', 'src/api.ts'],
  clean: true,
  dts: {
    only: true
  }
});
