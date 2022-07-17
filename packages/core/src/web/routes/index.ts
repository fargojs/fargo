import type { FastifyPluginCallback, FastifyPluginOptions } from 'fastify';

import { extension } from './extension';
import { ping } from './ping';
import { web } from './web';

export const routes: FastifyPluginCallback<FastifyPluginOptions> = (app, options, done) => {
  app.register(ping);
  app.register(extension);
  
  if (options.config.web?.enabled) {
    app.log.info('Web server enabled');
    app.register(web);
  }

  done();
};
