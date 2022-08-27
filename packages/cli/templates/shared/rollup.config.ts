import { defineConfig } from 'rollup';

import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  input: 'src/plugin.ts',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  external: ['@zotera/api'],
  plugins: [nodeResolve(), commonjs(), typescript()]
});
