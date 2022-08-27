import { Command } from 'commander';

import { login } from './login';
import { logout } from './logout';
import { whoami } from './whoami';

export const auth = new Command('auth');
auth.addCommand(login);
auth.addCommand(logout);
auth.addCommand(whoami);
