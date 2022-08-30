import { Command } from 'commander';
import path from 'path';
import fs from 'fs';
import { readConfiguration } from '@zotera/config';
import { unpack } from '@zotera/core';

export const install = new Command('install')
  .description('install plugin(s)')
  .option('-d, --dir <dir>', 'Directory to download to')
  .argument('<plugins...>', 'Plugin(s) to download')
  .action((plugins: string[]) => {
    const { pluginDir, __location } = readConfiguration(install.parent?.parent?.opts().config);

    const baseDownloadDir = path.join(__location, pluginDir);
    plugins.forEach((plugin) => {
      console.log(`Downloading ${plugin} to ${baseDownloadDir}`);

      if (path.extname(plugin) === '.zop') {
        if (!fs.existsSync(baseDownloadDir)) {
          fs.mkdirSync(baseDownloadDir);
          
        }
        // File should exists on disk.
        unpack(plugin, path.join(baseDownloadDir, plugin.replace(/\.zop$/, '')));
      }


    });
  });
