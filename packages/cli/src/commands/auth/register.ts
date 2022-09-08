import { Command } from 'commander';
import fetch from 'node-fetch';
import prompts from 'prompts';

import { loadZoteraRC } from '../../rc';

export const register = new Command('register')
  .option('-r, --registry <url>', 'Zotera Registry URL')
  .description('Register an account to a Zotera Registry')
  .action(async () => {
    const rc = await loadZoteraRC();
    let registry = register.opts().registry;

    if (!rc && !registry) {
      console.error('No zotera registry url specified');
      return;
    }

    if (rc && rc.registry && !registry) {
      registry = rc.registry;
    }

    const description = await (
      await prompts({
        name: 'description',
        message: 'What is the description of your plugin?',
        type: 'text',
        initial: 'A plugin for zotera'
      })
    ).description;
    const response = await fetch(`${registry}/-/auth/register`, {
      method: 'POST'
    });

    fetch;
  });
