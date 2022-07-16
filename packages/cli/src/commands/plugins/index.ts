import { Command, Help } from '@oclif/core';

export default class Plugins extends Command {
  static description = 'Manage Zotera Community Plugins';

  async run(): Promise<void> {
    const { argv } = await this.parse(Plugins);
    const help = new Help(this.config, { all: true });
    await help.showHelp(argv);
  }
}
