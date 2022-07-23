import fs from 'fs';
import path from 'path';
import { ZipFile } from 'yazl';

import type { PluginFile } from '@zotera/types';

export async function writeZOP(files: PluginFile[], out: string): Promise<void> {
  console.log(files);
  return new Promise((resolve, reject) => {
    const zip = new ZipFile();
    files.forEach((file) => {
      const basename = path.basename(file.path);
      // TODO: THIS DOES NOT WORK
      zip.addFile(file.path, `${basename}`);
    });

    zip.end();

    const zipStream = fs.createWriteStream(out);
    zip.outputStream.pipe(zipStream);

    zip.outputStream.once('error', reject);
    zipStream.once('error', reject);
    zipStream.once('finish', () => resolve);
  });
}
