import { Command } from '@oclif/core';

export default class WhoAmI extends Command {
  static description = 'Whoami';

  async run(): Promise<void> {
    // const { } = await this.parse(WhoAmI);
    this.log('This is not implemented yet.');
  }
}
