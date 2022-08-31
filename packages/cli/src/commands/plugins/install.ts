import axios from 'axios';
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

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
        if (fs.existsSync(plugin)) {
          unpack(plugin, path.join(baseDownloadDir, plugin.replace(/\.zop$/, '')));
          return;
        }

        try {
          const { protocol, href } = new URL(plugin);
          if (!allowedProtocols.has(protocol)) {
            throw new Error(`Protocol ${protocol} is not allowed`);
          }
          const response = await axios.get(href, {
            responseType: 'stream'
          });

/*           const pf = response.data.pipe(fs.createWriteStream(pathFile));
          pf.on('finish', () => {
            console.log('File downloaded successfully :)');
          }); */
        } catch (e) {
          console.error(e);
        }
      }
    });
  });
