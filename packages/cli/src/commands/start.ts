import { Command, Flags } from '@oclif/core';
import { createApp } from '@zotera/core';

export default class Start extends Command {
  static description = 'Start Zotera Server';

  static examples = [
    '$ zotera start',
    '$ zotera start --port 5050',
    '$ zotera start --config ./zotera.yaml'
  ];

  static flags = {
    port: Flags.string({ char: 'p', description: 'The port to use', default: '4000' }),
    config: Flags.string({
      char: 'c',
      description: 'The configuration file to use'
    })
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Start);

    process.title = 'zotera';

    const app = await createApp();

    await app.listen({
      port: parseInt(process.env.PORT || flags.port)
    });
  }
}
