import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';

import zoteraPlugin from '@zotera/fastify';
import type { ZoteraConfig } from '@zotera/types';

// import { setup } from './logging';

export async function zotera(config: ZoteraConfig): Promise<FastifyInstance> {
  const zotera = Fastify({
    // logger: setup(config.logging),
    ignoreTrailingSlash: true
  });

  zotera.register(zoteraPlugin, config);

  return zotera;
}
