import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';

import type { ZoteraConfig } from '@zotera/types';

import { storagePlugin } from './web/plugins/storage';
import { routes } from './web/routes';

export async function zotera(config: ZoteraConfig): Promise<FastifyInstance> {
  // Use logging options from config here.
  const zotera = Fastify({
    logger: true
  });

  zotera.register(storagePlugin, { config });
  zotera.register(routes);

  if (config.web?.enabled) {
    zotera.log.info('Web server enabled');
  }

  return zotera;
}
