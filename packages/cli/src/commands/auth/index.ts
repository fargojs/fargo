import { Command } from 'commander';

import { login } from './login';
import { logout } from './logout';
import { whoami } from './whoami';
import { register } from './register';

export const auth = new Command('auth').description('Manage authentication');
auth.addCommand(login);
auth.addCommand(logout);
auth.addCommand(whoami);
auth.addCommand(register);
