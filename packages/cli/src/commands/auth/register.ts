import { Command } from 'commander';
import inquirer from 'inquirer';
import fetch from 'node-fetch';

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

    const { username } = await inquirer.prompt({
      name: 'username',
      message: 'Username',
      type: 'text'
    });

    const { password } = await inquirer.prompt({
      name: 'password',
      message: 'Password',
      type: 'password'
    });

    console.log(username, password);

    const response = await fetch(`${registry}/-/auth/register`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
  });
