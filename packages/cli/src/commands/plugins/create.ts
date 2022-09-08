import { Command, Option } from 'commander';
import path from 'path';
import prompts from 'prompts';
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
        await prompts([
          {
            type: 'list',
            name: 'type',
            message: 'What type of plugin would you like to create?',
            choices: pluginTypes.map((type) => ({ title: type, value: type }))
          }
        ])
      ).type;
    }

    if (!name) {
      name = await (
        await prompts({
          name: 'name',
          message: 'What is the name of the plugin?',
          type: 'text',
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
      await prompts({
        name: 'description',
        message: 'What is the description of your plugin?',
        type: 'text',
        initial: 'A plugin for zotera'
      })
    ).description;

    if (!esbuild) {
      esbuild = await (
        await prompts({
          name: 'esbuild',
          message: 'Use esbuild as buildtool?',
          type: 'confirm'
        })
      ).esbuild;
    }

    if (!git) {
      git = await (
        await prompts({
          name: 'git',
          message: 'Initialize a git repository?',
          type: 'confirm'
        })
      ).git;
    }

    if (!vitest) {
      vitest = await (
        await prompts({
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
