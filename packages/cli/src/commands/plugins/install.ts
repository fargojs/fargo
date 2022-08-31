import { Command } from 'commander';
import fetch from 'node-fetch';
import { createWriteStream, existsSync } from 'node:fs';
import path from 'node:path';
import { Readable, promises as stream } from 'node:stream';

import { readConfiguration } from '@zotera/config';
import { unpack } from '@zotera/core';

const allowedProtocols = new Set(['http', 'https']);

export const install = new Command('install')
  .description('install plugin(s)')
  .option('-d, --dir <dir>', 'Directory to download to')
  .argument('<plugins...>', 'Plugin(s) to download')
  .action((plugins: string[]) => {
    const { pluginDir, __location } = readConfiguration(install.parent?.parent?.opts().config);

    const baseDownloadDir = path.join(__location, pluginDir);

    plugins.forEach(async (plugin) => {
      console.log(`Downloading ${plugin} to ${baseDownloadDir}`);

      if (path.extname(plugin) === '.zop') {
        if (existsSync(plugin)) {
          unpack(plugin, path.join(baseDownloadDir, plugin.replace(/\.zop$/, '')));
          return;
        }

        try {
          const fileName = path.basename(plugin);

          const { protocol, href } = new URL(plugin);

          if (!allowedProtocols.has(protocol.split(':')[0])) {
            throw new Error(`Protocol ${protocol} is not allowed`);
          }
          const response = await fetch(href);
          if (!response.ok) {
            throw new Error(`Could not download ${href}`);
          }
          await stream.pipeline(Readable.from(response.body!), createWriteStream(path.join(baseDownloadDir, fileName)));

          unpack(path.join(baseDownloadDir, fileName), path.join(baseDownloadDir, fileName.replace(/\.zop$/, '')));
          
        } catch (e) {
          console.error(e);
        }
      }
    });
  });
