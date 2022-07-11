import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';

import type { FargoConfig } from '@fargo/types';

export async function fargo(config: FargoConfig): Promise<FastifyInstance> {
  const app = Fastify();

  app.get("/", (req, res) => {
    res.send({ hello: "world" });
  })

  return app;
}
