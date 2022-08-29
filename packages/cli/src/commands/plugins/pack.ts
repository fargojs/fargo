import { Command } from 'commander';

import { pack as packPlugin, readManifest } from '@zotera/core';

export const pack = new Command('pack')
  .description('Pack a plugin')
  .option('-o, --out <out>', 'Output location')
  .action(async () => {
    const manifest = await readManifest(process.cwd());
    await packPlugin(manifest, pack.opts().out);
    console.log(`${manifest.name} is now packed, and ready to be installed.`);
  });
