import fs from 'fs';
import path from 'path';

import type { PluginFile, PluginManifest } from '@zotera/types';

import { writeZOP } from './write';

export async function pack(manifest: PluginManifest, out?: string) {
  const cwd = process.cwd();
  const files: PluginFile[] = [
    {
      localPath: path.join(cwd, 'package.json'),
      path: 'package.json'
    },
    {
      localPath: path.join(cwd, manifest.main || 'dist/plugin.js'),
      path: manifest.main || 'dist/plugin.js'
    }
  ];

  const output = await getOutput(manifest, out);
  await writeZOP(files, path.resolve(output));
}

async function getOutput(manifest: PluginManifest, out?: string): Promise<string> {
  if (!out) {
    return path.resolve(process.cwd(), `${manifest.name}.zop`);
  }

  try {
    const _stat = await fs.promises.stat(out);

    if (_stat.isDirectory()) {
      return path.join(out, `${manifest.name}.zop`);
    } else {
      return out;
    }
  } catch {
    return out;
  }
}
