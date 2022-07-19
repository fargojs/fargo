import _debug from 'debug';

import { locate, parseConfiguration } from '@zotera/config';
import type { ZoteraConfig } from '@zotera/types';

import { zotera } from './zotera';


const debug = _debug('zotera:server');

export async function createApp(config?: string | ZoteraConfig) {
  let parsedConfiguration: ZoteraConfig;
  if (!config || typeof config === 'string') {
    parsedConfiguration = parseConfiguration(locate(config));
  } else {
    parsedConfiguration = config;
  }

  const app = await zotera(parsedConfiguration);
  debug('Created App');
  return app;
}
