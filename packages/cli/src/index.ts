import { program } from 'commander';

import { auth } from './commands/auth';
import { plugins } from './commands/plugins';
import { publish } from './commands/publish';
import { start } from './commands/start';

declare global {
  const __VERSION__: string;
}

program
  .name('zotera')
  .version(__VERSION__)
  .option('-c, --config <path>', 'set config path', './deploy.conf');

program.addCommand(start);
program.addCommand(publish);
program.addCommand(auth);
program.addCommand(plugins);

program.parse(process.argv);
