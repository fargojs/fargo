import * as inquirer from 'inquirer';
import { createEnv } from 'yeoman-environment';

import { Command, Flags } from '@oclif/core';

export default class Create extends Command {
  static description = 'Create a plugin';

  static flags = {
    name: Flags.string({ char: 'n', description: 'name of the plugin' }),
    rollup: Flags.boolean({ description: 'use rollup', default: true })
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Create);

    let { name, rollup } = flags;
    if (!name) {
      name = await (
        await inquirer.prompt({
          name: 'name',
          message: 'What is the name of the plugin?',
          type: 'input',
          validate: (input: string) => {
            if (!input || input.trim().length === 0) {
              return 'Please enter a name';
            }
            return true;
          }
        })
      ).name;
    }

    if (!rollup) {
      rollup = await (await inquirer.prompt({
        name: 'rollup',
        message: 'Use rollup as buildtool?',
        type: 'confirm'
      })).rollup;
    }

    const env = createEnv();

    env.register(require.resolve('../../generator'), 'zotera:plugin');
    env.run('zotera:plugin', {
      name,
      rollup
    });
  }
}
