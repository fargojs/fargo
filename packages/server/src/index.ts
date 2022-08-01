import _debug from 'debug';
import path from 'path';

import { locate, parseYAML, parseJSON } from '@zotera/config';
import type { ZoteraConfig } from '@zotera/types';

import { ZoteraApp } from './zotera';

export { ZoteraApp };

interface CreateZoteraOptions {
  host: string;
  port: number;
  config?: string | ZoteraConfig;
  interactive: boolean;
}

const debug = _debug('zotera:server');

// export async function createApp(config?: string | ZoteraConfig) {
//   let parsedConfiguration: ZoteraConfig;
//   if (!config || typeof config === 'string') {
//     // TODO: Make this either use a .yaml or .json
//     parsedConfiguration = parseConfiguration(locate(config));
//   } else {
//     parsedConfiguration = config;
//   }

//   const app = await zotera(parsedConfiguration);
//   debug('Created App');
//   return app;
// }

export function createZotera(options: CreateZoteraOptions): ZoteraApp {
  debug('Initializing Zotera App');

  let configuration: ZoteraConfig;

  // Read and locate configuration
  if (!options.config || typeof options.config === 'string') {
    const location = locate(options.config);
    const fileType = path.extname(location);

    if (fileType !== '.yaml' && fileType !== '.json') {
      throw new Error(`Invalid configuration file type: ${fileType}`);
    }

    debug('Parsing %s configuration', fileType.replace('.', ''));

    if (fileType === '.yaml') {
      configuration = parseYAML(location);
    } else {
      configuration = parseJSON(location);
    }
  } else {
    configuration = options.config;
  }

  // TODO: Deep Merge
  // Add some sort of deep merge here, so configuration
  // always has some required values
  console.log(configuration);


  const zotera = new ZoteraApp();

  return zotera;
}
