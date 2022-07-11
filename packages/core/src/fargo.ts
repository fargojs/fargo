import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';

import type { FargoConfig } from '@fargo/types';

export async function fargo(config: FargoConfig): Promise<FastifyInstance> {
  const app = Fastify();

  return app;
}
