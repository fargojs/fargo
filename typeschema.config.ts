import { defineConfig } from 'typeschema/config';

export default defineConfig({
  zod: {
    input: ['packages/types/src/**/*.ts'],
    outputDir: '.',
    tsconfig: 'tsconfig.json'
  }
});
