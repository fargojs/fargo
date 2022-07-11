import _debug from 'debug';

import { parseConfiguration } from '@fargo/config';
import type { FargoConfig } from '@fargo/types';

import { fargo } from './fargo';

const debug = _debug('fargo:core');

export async function createApp(config?: string | FargoConfig) {
  let parsedConfiguration: FargoConfig;

  if (!config || typeof config === 'string') {
    parsedConfiguration = parseConfiguration(config as string);
  } else {
    parsedConfiguration = config;
  }

  const app = await fargo(parsedConfiguration);
  debug('Started App');
  return app;
}
