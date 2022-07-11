import { parseConfiguration } from '@fargo/config';
import { createApp } from '@fargo/core';
import { Command, Flags } from '@oclif/core';

export default class Start extends Command {
  static description = 'Say hello';

  static examples = [
    `$ oex hello friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`
  ];

  static flags = {
    port: Flags.integer({ char: 'p', description: 'The port to use' })
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Start);

    const parsedConfiguration = parseConfiguration();

    process.title = 'fargo';

    const app = await createApp(parsedConfiguration);

    await app.listen({
      port: flags.port || parseInt(process.env.PORT || '4000')
    });
  }
}
