import { Command } from '@oclif/core';

export default class Plugins extends Command {
  static description = 'Manage Zotera Community Plugins';

  async run(): Promise<void> {
    this.exit(0);
  }
}
