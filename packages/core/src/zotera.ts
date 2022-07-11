import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';

import type { ZoteraConfig } from '@zotera/types';

export async function zotera(config: ZoteraConfig): Promise<FastifyInstance> {
  const app = Fastify();

  app.get("/", (req, res) => {
    res.send({ hello: "world" });
  })

  return app;
}
