import _debug from 'debug';
import Fastify, { FastifyInstance } from 'fastify';

// import { isAbsolute, resolve } from 'node:path';
import { readConfiguration } from '@zotera/config';
import zoteraPlugin from '@zotera/fastify';
import { initialize } from '@zotera/logger';
import { ZoteraConfig } from '@zotera/types';

const debug = _debug('zotera:server');

export async function createZotera(config?: string | ZoteraConfig): Promise<FastifyInstance> {
  debug('Initializing Zotera App');

  let configuration: ZoteraConfig;

  // Read and locate configuration
  if (!config || typeof config === 'string') {
    configuration = await readConfiguration(config);
  } else {
    configuration = config;
    configuration.__location = process.cwd();
  }

  // if (configuration.logging) {
  //   configuration.logging.destination = resolve(
  //     configuration.logging.destination || `${configuration.__location}/logs`
  //   );
  // }

  const zotera = Fastify({
    logger: initialize(configuration.logging)
  });
  debug('Loaded configuration %O', configuration);
  zotera.register(zoteraPlugin, configuration);
  return zotera;
}
