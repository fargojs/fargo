import { Command, Help } from '@oclif/core';

export default class Auth extends Command {
  static description = 'Authenticate with Zotera';

  async run(): Promise<void> {
    const { argv } = await this.parse(Auth);
    const help = new Help(this.config, { all: true });
    await help.showHelp(argv);
  }
}
