import fs from 'fs';
import path from 'path';

import type { PluginManifest } from '@zotera/types';

import { findFiles } from './read';
import { writeZOP } from './write';

export async function pack(manifest: PluginManifest, out?: string) {
  const files = await findFiles(manifest);

  const output = await getOutput(manifest, out);
  console.log(output);
  console.log(files);
  writeZOP(files, path.resolve(output));
}

async function getOutput(manifest: PluginManifest, out?: string): Promise<string> {
  if (!out) {
    return path.resolve(process.cwd(), `${manifest.name}-v${manifest.version || 'x.x.x'}.zop`);
  }

  try {
    const _stat = await fs.promises.stat(out);

    if (_stat.isDirectory()) {
      return path.join(out, `${manifest.name}-v${manifest.version || 'x.x.x'}.zop`);
    } else {
      return out;
    }
  } catch {
    return out;
  }
}
