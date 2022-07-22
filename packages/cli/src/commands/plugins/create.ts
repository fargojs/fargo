import * as inquirer from 'inquirer';
import { createEnv } from 'yeoman-environment';

import { Command, Flags } from '@oclif/core';

const pluginTypes = ['routing', 'storage', 'auth'];

export default class Create extends Command {
  static description = 'Create a plugin';

  static flags = {
    type: Flags.enum({
      char: 't',
      options: pluginTypes,
      description: 'type of plugin'
    }),
    name: Flags.string({ char: 'n', description: 'name of the plugin' }),
    rollup: Flags.boolean({ description: 'use rollup', default: false }),
    git: Flags.boolean({ description: 'use git', default: false }),
    vitest: Flags.boolean({ description: 'use vitest', default: false })
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Create);

    let { type, name, rollup, git, vitest } = flags;
    if (!type) {
      type = await (
        await inquirer.prompt([
          {
            type: 'list',
            name: 'type',
            message: 'What type of plugin would you like to create?',
            choices: pluginTypes
          }
        ])
      ).type;
    }

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

    const description = await (
      await inquirer.prompt({
        name: 'description',
        message: 'What is the description of your plugin?',
        type: 'input',
        default: 'A plugin for zotera'
      })
    ).description;

    if (!rollup) {
      rollup = await (
        await inquirer.prompt({
          name: 'rollup',
          message: 'Use rollup as buildtool?',
          type: 'confirm'
        })
      ).rollup;
    }

    if (!git) {
      git = await (
        await inquirer.prompt({
          name: 'git',
          message: 'Initialize a git repository?',
          type: 'confirm'
        })
      ).git;
    }

    if (!vitest) {
      vitest = await (
        await inquirer.prompt({
          name: 'vitest',
          message: 'Use vitest for testing?',
          type: 'confirm'
        })
      ).vitest;
    }

    const env = createEnv();

    env.register(require.resolve(`../../generators/${type}`), `zotera:plugin:${type}`);
    env.run(`zotera:plugin:${type}`, {
      name,
      rollup,
      git,
      description,
      vitest
    });
  }
}
