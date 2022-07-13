import { Command } from '@oclif/core';

export default class Create extends Command {
  static description = 'Create a plugin';

  async run(): Promise<void> {
    // const { flags } = await this.parse(Publish);

    this.log('This is not implemented yet.');
  }
}
