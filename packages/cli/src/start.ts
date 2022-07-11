import { Command, Option } from 'clipanion';

import { parseConfiguration } from '@fargo/config';
import { createApp } from '@fargo/core';

export class StartCommand extends Command {
  public static paths = [Command.Default];

  private port = Option.String('-p,--port', {
    description: 'The port to listen on (default: 4000)'
  });

  static usage = Command.Usage({
    description: 'Start the server',
    details: 'Start the server'
  });

  async execute(): Promise<void> {
    try {
      const parsedConfiguration = parseConfiguration();

      process.title = 'fargo';

      const app = await createApp(parsedConfiguration);

      await app.listen({
        port: parseInt(process.env.PORT || this.port || '4000')
      });
    } catch (err: any) {
      console.error(err);
      process.exit(1);
    }
  }
}
