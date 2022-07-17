import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';

import type { ZoteraConfig } from '@zotera/types';

import { setup } from './logging';
import { storagePlugin } from './web/plugins/storage';
import { routes } from './web/routes';

export async function zotera(config: ZoteraConfig): Promise<FastifyInstance> {
  const zotera = Fastify({
    logger: setup(config.logging),
    ignoreTrailingSlash: true
  });

  zotera.register(storagePlugin, { config });
  zotera.register(routes, { config });

  return zotera;
}
