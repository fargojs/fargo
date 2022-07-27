import dts from 'rollup-plugin-dts';
import yaml from '@rollup/plugin-yaml';
import { nodeResolve } from '@rollup/plugin-node-resolve';
/* import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json'; */
import typescript from '@rollup/plugin-typescript';

const entries = ['src/index.ts'];

export default {
  input: entries,
  output: {
    dir: 'dist',
    format: 'esm'
  },
  plugins: [dts(), typescript(), yaml(), nodeResolve()],
  onwarn(warning) {
    if (/Circular dependencies/.test(warning.message)) return;
    console.error(warning.message);
  }
}
