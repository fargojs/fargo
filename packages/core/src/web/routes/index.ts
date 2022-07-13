import type { FastifyPluginCallback } from 'fastify';

import { extension } from './extension';
import { ping } from './ping';

export const routes: FastifyPluginCallback = (app, _, done) => {
  app.register(ping);
  app.register(extension);

  done();
};
