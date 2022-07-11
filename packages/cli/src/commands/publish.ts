import { Command } from '@oclif/core';

export default class Publish extends Command {
  static description = 'Publish an extension to Zotera';

  static examples = [];

  async run(): Promise<void> {
    // const { flags } = await this.parse(Publish);

    this.log('This is not implemented yet.');
  }
}
