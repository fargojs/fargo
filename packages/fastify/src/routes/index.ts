import type { FastifyPluginCallback } from 'fastify';

import type { PluginOptions } from '../types';
import { extension } from './extension';
import { ping } from './ping';
import { web } from './web';

export const routes: FastifyPluginCallback<PluginOptions> = (app, options, done) => {
  app.register(ping);
  app.register(extension);

  if (options.web?.enabled) {
    app.log.info('Web server enabled');
    app.register(web);
  }

  done();
};
