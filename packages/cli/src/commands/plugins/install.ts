import { Command } from 'commander';
import path from 'path';

export const install = new Command('install')
  .description('install plugin(s)')
  .option('-d, --dir <dir>', 'Directory to download to')
  .argument('<plugins...>', 'Plugin(s) to download')
  .action((plugins: string[]) => {
    plugins.forEach((plugin) => {
      const configPath = install.parent?.parent?.opts().config;

      console.log(configPath);


      const downloadDir = path.join(process.cwd(), install.opts().dir || 'plugins', plugin);
      console.log(downloadDir);

      console.log(`Downloading ${plugin}`);
      if (/github:(.+)/.test(plugin)) {
        console.log(`Downloading ${plugin} from GitHub`);

      }

      if (path.extname(plugin) === '.zop') {
        console.log(`Downloading ${plugin} from local file`);
      }


    });
    console.log('This is not implemented yet.');
    console.log(install.opts());
    console.log('PARENT', install.parent?.opts());

    console.log(JSON.stringify(plugins, null, 2));
  });
