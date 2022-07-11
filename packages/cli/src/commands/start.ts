import { parseConfiguration } from '@fargo/config';
import { createApp } from '@fargo/core';
import { Command, Flags } from '@oclif/core';

export default class Start extends Command {
  static description = 'Start Fargo Server';

  static examples = [
    '$ fargo start',
    '$ fargo start --port 5050',
    '$ fargo start --config ./fargo.yaml'
  ];

  static flags = {
    port: Flags.string({ char: 'p', description: 'The port to use', default: '4000' }),
    config: Flags.string({
      char: 'c',
      description: 'The configuration file to use',
      default: './fargo.yaml'
    })
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Start);

    const parsedConfiguration = parseConfiguration(flags.config);

    process.title = 'fargo';

    const app = await createApp(parsedConfiguration);

    await app.listen({
      port: parseInt(process.env.PORT || flags.port)
    });
  }
}
