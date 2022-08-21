import { Command } from '@oclif/core';

export default class Login extends Command {
  static description = 'Login to Zotera';

  async run(): Promise<void> {
    // const { } = await this.parse(Login);
    this.log('This is not implemented yet.');
  }
}
