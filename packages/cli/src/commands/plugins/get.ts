import { Command, Flags } from '@oclif/core';

export default class Get extends Command {
  static description = 'Download a plugin';

  static flags = {
    dir: Flags.string({
      char: 'd',
      description: 'Directory to download to'
    })
  };

  static args = [
    {
      name: 'plugin',
      required: true,
      description: 'Plugin to download'
    }
  ];

  static examples = ['$ zotera plugins get <plugin1> <plugin2>'];

  static strict = false;

  async run(): Promise<void> {
    const { flags, argv } = await this.parse(Get);
    this.log('This is not implemented yet.');
    this.log(JSON.stringify(flags, null, 2));
    this.log(JSON.stringify(argv, null, 2));
  }
}
