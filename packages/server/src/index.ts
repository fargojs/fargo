import _debug from 'debug';
import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import path from 'path';

import { locate, parseJSON, parseYAML, readConfiguration } from '@zotera/config';
import zoteraPlugin from '@zotera/fastify';
import type { ZoteraConfig } from '@zotera/types';

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

  const zotera = Fastify();
  debug('Loaded configuration %O', configuration);
  zotera.register(zoteraPlugin, configuration);
  return zotera;
}
