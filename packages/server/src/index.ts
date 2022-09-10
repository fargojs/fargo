import _debug from 'debug';
import Fastify, { FastifyInstance } from 'fastify';

import { readConfiguration } from '@zotera/config';
import zoteraPlugin from '@zotera/fastify';
import { ZoteraConfig } from '@zotera/types';

import { setup } from './logging';

const debug = _debug('zotera:server');

export function createZotera(config?: string | ZoteraConfig): FastifyInstance {
  debug('Initializing Zotera App');

  let configuration: ZoteraConfig;

  // Read and locate configuration
  if (!config || typeof config === 'string') {
    configuration = readConfiguration(config);
  } else {
    configuration = config;
    configuration.__location = process.cwd();
  }

  const zotera = Fastify({
    // logger: setup(configuration.logging)
  });
  debug('Loaded configuration %O', configuration);
  zotera.register(zoteraPlugin, configuration);
  return zotera;
}
