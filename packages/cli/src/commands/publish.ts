import { promises as fs } from 'fs';
import JoyCon from 'joycon';
import path from 'path';

import { Command, Flags } from '@oclif/core';

interface ZoteraRC {
  registry: string;
}

export default class Publish extends Command {
  static description = 'Publish an extension to a Zotera Registry';

  static flags = {
    registry: Flags.string({ description: 'zotera registry url' })
  };

  static args = [{ name: 'file', description: 'file to publish', required: true }];

  async loadZoteraRC(): Promise<ZoteraRC | undefined> {
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

  async run(): Promise<void> {
    const { flags, args } = await this.parse(Publish);
    const file = args.file;
    const rc = await this.loadZoteraRC();
    let registry = flags.registry;

    if (!rc && !registry) {
      this.error('No zotera registry url specified');
    }

    if (rc && rc.registry && !registry) {
      registry = rc.registry;
    }
    this.log(registry);
    this.log(file);
    // TODO: publish to registry
  }
}
