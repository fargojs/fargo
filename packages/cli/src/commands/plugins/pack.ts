import { Command, Flags } from '@oclif/core';
import { pack, readManifest } from '@zotera/core';

export default class Pack extends Command {
  static description = 'Pack a plugin';

  static flags = {
    out: Flags.string({
      char: 'o',
      description: 'Output location'
    })
  };

  static examples = ['$ zotera plugins pack'];

  async run(): Promise<void> {
    const { flags } = await this.parse(Pack);
    const manifest = await readManifest(process.cwd());
    await pack(manifest, flags.out);
    this.log(`Plugin ${manifest.name} packed`);
  }
}
