import fs from 'fs';
import path from 'path';
import { ZipFile } from 'yazl';

import type { PluginFile, PluginManifest } from '@zotera/types';


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
  return new Promise((resolve, reject) => {
    const zip = new ZipFile();
    files.forEach((file) => {
      zip.addFile(file.localPath, file.path);
    });

    zip.end();

    const zipStream = fs.createWriteStream(path.resolve(output));
    zip.outputStream.pipe(zipStream);

    zip.outputStream.once('error', reject);
    zipStream.once('error', reject);
    zipStream.once('finish', () => resolve);
  });
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
