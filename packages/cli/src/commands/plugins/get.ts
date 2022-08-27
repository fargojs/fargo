import { Command } from 'commander';

export const get = new Command('get')
  .description('Download a plugin')
  .option('-d, --dir <dir>', 'Directory to download to')
  .argument('<plugins...>', 'Plugin(s) to download')
  .action((plugins) => {
    console.log('This is not implemented yet.');
    console.log(JSON.stringify(get.opts().dir, null, 2));
    console.log(JSON.stringify(plugins, null, 2));
  });
