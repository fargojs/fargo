import _debug from 'debug';
import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import path from 'path';

import { locate, parseJSON, parseYAML } from '@zotera/config';
import zoteraPlugin from '@zotera/fastify';
import type { ZoteraConfig } from '@zotera/types';

const debug = _debug('zotera:server');

export function createZotera(config?: string | ZoteraConfig): FastifyInstance {
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

  const zotera = Fastify();
  debug('Loaded configuration %O', configuration);
  zotera.register(zoteraPlugin, configuration);
  return zotera;
}
