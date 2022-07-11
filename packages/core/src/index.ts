import _debug from 'debug';

import { parseConfiguration } from '@zotera/config';
import type { ZoteraConfig } from '@zotera/types';

import { zotera } from './zotera';

const debug = _debug('zotera:core');

export async function createApp(config?: string | ZoteraConfig) {
  let parsedConfiguration: ZoteraConfig;

  if (!config || typeof config === 'string') {
    parsedConfiguration = parseConfiguration(config as string);
  } else {
    parsedConfiguration = config;
  }

  const app = await zotera(parsedConfiguration);
  debug('Created App');
  return app;
}
