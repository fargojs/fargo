import { Command } from 'commander';

export const install = new Command('install')
  .description('install plugin(s)')
  .option('-d, --dir <dir>', 'Directory to download to')
  .option('-c, --config <path>', 'Configuration file path')
  .argument('<plugins...>', 'Plugin(s) to download')
  .action((plugins) => {
    console.log('This is not implemented yet.');
    console.log(install.opts());
    console.log('PARENT', install.parent?.opts());

    console.log(JSON.stringify(plugins, null, 2));
  });
