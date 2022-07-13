import type { FastifyPluginCallback } from 'fastify';

import { ping } from './ping';

export const routes: FastifyPluginCallback = (app, options, done) => {
  app.register(ping);
  done();
};
