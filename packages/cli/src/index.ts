import { Cli } from 'clipanion';

import { version } from '../package.json';
import { PublishCommand } from './publish';
import { StartCommand } from './start';
import { VersionCommand } from './version';

const [node, app, ...args] = process.argv;

const cli = new Cli({
  binaryLabel: 'fargo',
  binaryName: `${node} ${app}`,
  binaryVersion: version
});

cli.register(StartCommand);
cli.register(PublishCommand);
cli.register(VersionCommand);
cli.runExit(args, Cli.defaultContext);

process.on('unhandledRejection', (reason: Error) => {
  console.error(
    `uncaught exception, please report (https://github.com/fargojs/fargo/issues) this: \n${reason.stack}`
  );
  process.exit(1);
});
