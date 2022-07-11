import { Command } from '@oclif/core';

export default class Publish extends Command {
  static description = 'Publish an extension to Fargo';

  static examples = [];


  async run(): Promise<void> {
    const {} = await this.parse(Publish);

    this.log("This is not implemented yet.");
  }
}
