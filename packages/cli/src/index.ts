import { program } from 'commander';

import { auth } from './commands/auth';
import { plugins } from './commands/plugins';
import { publish } from './commands/publish';
import { start } from './commands/start';

declare global {
  const __VERSION__: string;
}

program.name('zotera').version(__VERSION__).option('-c, --config <path>', 'set config path');

program.addCommand(start);
program.addCommand(publish);
program.addCommand(plugins);
program.addCommand(auth);

program.parse(process.argv);
