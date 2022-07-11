import { parseConfiguration } from '@zotera/config';
import { createApp } from '@zotera/core';
import { Command, Flags } from '@oclif/core';

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
      description: 'The configuration file to use',
      default: './zotera.yaml'
    })
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Start);

    const parsedConfiguration = parseConfiguration(flags.config);

    process.title = 'zotera';

    const app = await createApp(parsedConfiguration);

    await app.listen({
      port: parseInt(process.env.PORT || flags.port)
    });
  }
}
