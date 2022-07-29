import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';

import type { PluginFile, PluginManifest } from '@zotera/types';

export async function pack(manifest: PluginManifest, out?: string) {
  const cwd = process.cwd();
  const files: PluginFile[] = [
    {
      localPath: path.join(cwd, 'package.json'),
      path: ''
    },
    {
      localPath: path.join(cwd, manifest.main || 'dist/plugin.js'),
      path: '/dist'
    }
  ];

  const output = await getOutput(manifest, out);
  const zip = new AdmZip();
  files.forEach((file) => {
    zip.addLocalFile(file.localPath, file.path);
  });

  await zip.writeZipPromise(output, { overwrite: true });
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
