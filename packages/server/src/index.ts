import _debug from 'debug';
import path from 'path';

import { locate, parseJSON, parseYAML } from '@zotera/config';
import type { ZoteraConfig } from '@zotera/types';

import { ZoteraApp } from './zotera';

export { ZoteraApp };


const debug = _debug('zotera:server');

export function createZotera(config?: string | ZoteraConfig): ZoteraApp {
  debug('Initializing Zotera App');

  let configuration: ZoteraConfig;

  // Read and locate configuration
  if (!config || typeof config === 'string') {
    const location = locate(config);
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
    configuration.__location = path.dirname(location);
  } else {
    configuration = config;
    configuration.__location = process.cwd();
  }


  // TODO: Deep Merge
  // Add some sort of deep merge here, so configuration
  // always has some required values

  const zotera = new ZoteraApp(configuration);
  return zotera;
}
