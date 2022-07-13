import { Command } from '@oclif/core';

export default class List extends Command {
  static description = 'List all plugins';

  async run(): Promise<void> {
    // const { flags } = await this.parse(List);

    this.log('This is not implemented yet.');
  }
}
