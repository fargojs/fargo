import { Command, Option } from 'commander';
import inquirer from 'inquirer';
import { createEnvironment } from 'neoman';
import path from 'path';

import { depVersions } from '../../dep-versions';
import { AuthPluginGenerator, StoragePluginGenerator } from '../../generators';

const pluginTypes = ['storage', 'auth'];

const typeOption = new Option('-t, --type [type]', 'type of plugin').choices(pluginTypes);

export const create = new Command('create')
  .description('Create a plugin')
  .addOption(typeOption)
  .option('-n, --name [name]', 'name of the plugin')
  .option('--rollup', 'use rollup')
  .option('--git', 'use git')
  .option('--vitest', 'use vitest')
  .action(async () => {
    let { type, name, rollup, git, vitest } = create.opts();
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

    const neomanEnv = createEnvironment({
      name,
      rollup,
      git,
      description,
      vitest,
      dep(dep: string): string {
        const version = depVersions[dep];
        if (!version) {
          throw new Error(`No version found for ${dep}`);
        }

        return `"${dep}": "${version}"`;
      }
    });

    const generator = type === 'auth' ? AuthPluginGenerator : StoragePluginGenerator;
    neomanEnv.register(`zotera:plugin:${type}`, generator);
    neomanEnv.run(`zotera:plugin:${type}`, {
      name,
      rollup,
      git,
      description,
      vitest
    });

    // const yeoman = await import('yeoman-environment');
    // const env = yeoman.default.createEnv();
    // env.register(path.join(__dirname, `./generators/${type}`), `zotera:plugin:${type}`);
    // env.run(`zotera:plugin:${type}`, {
    //   name,
    //   rollup,
    //   git,
    //   description,
    //   vitest
    // });
  });
