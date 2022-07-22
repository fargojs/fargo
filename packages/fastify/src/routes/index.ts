import type { FastifyPluginCallback } from 'fastify';

import type { PluginOptions } from '../types';
import { extension } from './extension';
import { web } from './web';

export const routes: FastifyPluginCallback<PluginOptions> = (app, options, done) => {
  app.register(extension);

  if (options.web?.enabled) {
    app.log.info('Web server enabled');
    app.register(web, {
      prefix: '/-/'
    });
  }

  done();
};
