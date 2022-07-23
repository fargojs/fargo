import fs from 'fs';
import path from 'path';

import type { PluginManifest } from '@zotera/types';

export async function readManifest(cwd: string): Promise<PluginManifest> {
  const manifestPath = path.join(cwd, 'package.json');

  const manifest = await fs.promises
    .readFile(manifestPath, 'utf8')
    .catch(() => Promise.reject(new Error(`Could not find manifest at ${manifestPath}`)))
    .then<PluginManifest>((content) => {
      try {
        return Promise.resolve(JSON.parse(content));
      } catch (e) {
        return Promise.reject(
          // eslint-disable-next-line @typescript-eslint/quotes
          new Error("Error parsing 'package.json' manifest file: not a valid JSON file.")
        );
      }
    });

  return manifest;
}
