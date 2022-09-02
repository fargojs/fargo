import { Command, Option } from 'commander';
import inquirer from 'inquirer';
import path from 'path';
import { fileURLToPath } from 'url';

import { createEnvironment } from '@luxass/neoman';

import { depVersions } from '../../dep-versions';
import AuthPluginGenerator from '../../generators/auth';
import StoragePluginGenerator from '../../generators/storage';

const pluginTypes = ['storage', 'auth'];

const typeOption = new Option('-t, --type [type]', 'type of plugin').choices(pluginTypes);

export const create = new Command('create')
  .description('Create a plugin')
  .addOption(typeOption)
  .option('-n, --name [name]', 'name of the plugin')
  .option('--esbuild', 'use esbuild')
  .option('--git', 'use git')
  .option('--vitest', 'use vitest')
  .action(async () => {
    let { type, name, esbuild, git, vitest } = create.opts();
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

    if (!esbuild) {
      esbuild = await (
        await inquirer.prompt({
          name: 'esbuild',
          message: 'Use esbuild as buildtool?',
          type: 'confirm'
        })
      ).esbuild;
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
      dep: (dep: string) => {
        const version = depVersions[dep];
        if (!version) {
          throw new Error(`No version found for ${dep}`);
        }

        return `"${dep}": "${version}"`;
      },
      dirname: path.dirname(fileURLToPath(import.meta.url)),
      name,
      esbuild,
      git,
      description,
      vitest
    });

    neomanEnv.register('zotera:plugin:auth', AuthPluginGenerator);
    neomanEnv.register('zotera:plugin:storage', StoragePluginGenerator);

    neomanEnv.run(`zotera:plugin:${type}`);
  });
