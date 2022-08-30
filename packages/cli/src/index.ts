import { program } from 'commander';

import { login } from './commands/login';
import { logout } from './commands/logout';
import { plugins } from './commands/plugins';
import { publish } from './commands/publish';
import { start } from './commands/start';
import { whoami } from './commands/whoami';

declare global {
  const __VERSION__: string;
}

program.name('zotera').version(__VERSION__).option('-c, --config <path>', 'set config path');

program.addCommand(start);
program.addCommand(publish);
program.addCommand(plugins);
program.addCommand(login);
program.addCommand(logout);
program.addCommand(whoami);

program.parse(process.argv);
