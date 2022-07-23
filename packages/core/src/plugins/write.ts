import fs from 'fs';
import { ZipFile } from 'yazl';

import type { PluginFile } from '@zotera/types';

export async function writeZOP(files: PluginFile[], out: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const zip = new ZipFile();
    files.forEach((file) => {
      zip.addFile(file.localPath, file.path);
    });

    zip.end();

    const zipStream = fs.createWriteStream(out);
    zip.outputStream.pipe(zipStream);

    zip.outputStream.once('error', reject);
    zipStream.once('error', reject);
    zipStream.once('finish', () => resolve);
  });
}
