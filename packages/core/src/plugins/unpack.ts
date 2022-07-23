import fs from 'fs';
import path from 'path';
import type { Entry, ZipFile } from 'yauzl';
import { open } from 'yauzl';

export async function unpack(location: string) {
  const zipfile = await new Promise<ZipFile>((resolve, reject) =>
    open(location, { lazyEntries: true }, (err, zipfile) => (err ? reject(err) : resolve(zipfile!)))
  );
  console.log(zipfile.readEntry())

  return await new Promise((resolve, reject) => {
    zipfile.readEntry();

    zipfile.once('close', () => resolve(null));

    zipfile.on('entry', (entry: Entry) => {
      if (/\/$/.test(entry.fileName)) {
        // Directory file names end with '/'.
        // Note that entires for directories themselves are optional.
        // An entry's fileName implicitly requires its parent directories to exist.
        zipfile.readEntry();
      } else {
        // file entry
        zipfile.openReadStream(entry, (err, readStream) => {
          if (err) {
            zipfile.close();
            reject(err);
          }
          readStream.on('end', () => {
            zipfile.readEntry();
          });
          readStream.pipe(fs.createWriteStream(entry.fileName));
        });
      }
    });
  });
  // const cwd = process.cwd();
  // const files: PluginFile[] = [
  //   {
  //     path: path.join(cwd, 'package.json')
  //   },
  //   {
  //     path: path.join(cwd, manifest.main || 'dist/plugin.js')
  //   }
  // ];

  // const output = await getOutput(manifest, out);
  // await writeZOP(files, path.resolve(output));
}
