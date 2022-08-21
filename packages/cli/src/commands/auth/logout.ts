import { Command } from '@oclif/core';

export default class Logout extends Command {
  static description = 'Logout of Zotera';

  async run(): Promise<void> {
    // const { } = await this.parse(Logout);
    this.log('This is not implemented yet.');
  }
}
