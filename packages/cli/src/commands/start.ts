import { Command } from 'commander';
// import c from 'picocolors';

import { createZotera } from '@zotera/server';

export const start = new Command('start')
  .description('Start the Zotera server')
  .option('-p, --port <port>', 'port to listen on', '4000')
  .option('-h, --host <host>', 'host to use', 'localhost')
  .option('-c, --config <path>', 'config path')
  .action(async () => {
    try {
      const flags = start.opts();
      process.title = 'zotera';
      const zotera = createZotera(flags.config);

      await zotera.listen({
        port: parseInt(flags.port),
        host: flags.host
      });
    } catch (e) {
      process.exitCode = 1;
      // console.error(`\n${c.red(c.bold(c.inverse(' Unhandled Error ')))}`);
      console.error(e);
      console.error('\n\n');
    }
  });
