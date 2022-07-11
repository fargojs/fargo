import { Command } from '@oclif/core';

export default class Get extends Command {
  static description = 'Download a plugin';

  async run(): Promise<void> {
    // const { flags } = await this.parse(Publish);

    this.log('This is not implemented yet.');
  }
}
