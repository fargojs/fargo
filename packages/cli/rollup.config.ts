import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';

/* import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json'; */
import typescript from '@rollup/plugin-typescript';

const generatorEntries = [
  'src/generators/auth.ts',
  'src/generators/routing.ts',
  'src/generators/storage.ts'
];

const commandsEntries = [
  'src/commands/start.ts',
  'src/commands/publish.ts',
  'src/commands/plugins/create.ts',
  'src/commands/plugins/get.ts',
  'src/commands/plugins/index.ts',
  'src/commands/plugins/list.ts',
  'src/commands/plugins/pack.ts'
];

const entries = ['src/index.ts', 'src/dep-versions.ts', ...generatorEntries, ...commandsEntries];

export default defineConfig({
  input: entries,
  output: {
    dir: 'dist',
    format: 'esm'
  },
  plugins: [typescript(), dts()],
  onwarn(warning) {
    if (/Circular dependencies/.test(warning.message)) return;
    console.error(warning.message);
  }
});
