import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/extension.ts'],
  format: 'cjs',
  bundle: true,
  outDir: './dist',
  external: ['vscode'],
  platform: 'node'
});
