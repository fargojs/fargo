import { Command } from 'commander';
import { promises as fs } from 'fs';
import JoyCon from 'joycon';
import path from 'path';

import { publish as publishExtension } from '@zotera/core';

interface ZoteraRC {
  registry: string;
}

async function loadZoteraRC(): Promise<ZoteraRC | undefined> {
  const cwd = process.cwd();
  const joycon = new JoyCon();
  const joyconResult = await joycon.resolve({
    files: ['.zoterarc', 'package.json'],
    cwd,
    stopDir: path.parse(cwd).root,
    packageKey: 'zotera'
  });

  if (joyconResult) {
    let data = JSON.parse(await fs.readFile(joyconResult, 'utf8'));
    if (joyconResult.endsWith('package.json')) {
      data = data.zotera;
    }

    return data;
  }

  return undefined;
}

export const publish = new Command('publish')
  .option('-r, --registry <url>', 'Zotera Registry URL')
  .description('Publish an extension to a Zotera Registry')
  .argument('[file]', 'vsix file to publish')
  .action(async (file) => {
    const rc = await loadZoteraRC();
    let registry = publish.opts().registry;

    if (!rc && !registry) {
      console.error('No zotera registry url specified');
    }

    if (rc && rc.registry && !registry) {
      registry = rc.registry;
    }

    // TODO: Authentication check
    console.log(registry);
    console.log(file);
    await publishExtension(file, registry as string);
  });
