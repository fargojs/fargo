import c from 'picocolors';

import { Command, Flags } from '@oclif/core';
import { createZotera } from '@zotera/server';

export default class Start extends Command {
  static description = 'Start Zotera Server';

  static examples = [
    '$ zotera start',
    '$ zotera start --port 5050 --host localhost',
    '$ zotera start --config ./zotera.yaml',
    '$ zotera start --interactive'
  ];

  static flags = {
    port: Flags.integer({ char: 'p', description: 'The port to use', default: 4000 }),
    host: Flags.string({ char: 'h', description: 'The host to use', default: 'localhost' }),
    interactive: Flags.boolean({
      char: 'i',
      description: 'Use interactive with keypresses',
      default: false
    }),
    config: Flags.string({
      char: 'c',
      description: 'The configuration file to use'
    })
  };

  async run(): Promise<void> {
    try {
      const { flags } = await this.parse(Start);

      process.title = 'zotera';
      const app = createZotera({
        host: flags.host,
        port: flags.port,
        config: flags.config,
        interactive: flags.interactive
      });

      await app.listen();
    } catch (e) {
      process.exitCode = 1;
      console.error(`\n${c.red(c.bold(c.inverse(' Unhandled Error ')))}`);
      console.error(e);
      console.error('\n\n');
    }
  }
}
