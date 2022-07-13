import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';

import type { ZoteraConfig } from '@zotera/types';

import { routes } from './routes';

export async function zotera(config: ZoteraConfig): Promise<FastifyInstance> {
  const app = Fastify();

  app.register(routes);

  return app;
}
