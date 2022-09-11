import { Command } from 'commander';

import { login } from './login';
import { logout } from './logout';
import { register } from './register';
import { whoami } from './whoami';

export const auth = new Command('auth').description('Manage authentication');
auth.addCommand(login);
auth.addCommand(logout);
auth.addCommand(whoami);
auth.addCommand(register);
