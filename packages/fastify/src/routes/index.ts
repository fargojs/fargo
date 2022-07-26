import type { FastifyPluginCallback } from 'fastify';

import type { PluginOptions } from '../types';
import { extensions } from './extensions';
import { web } from './web';

export const routes: FastifyPluginCallback<PluginOptions> = (app, options, done) => {
  app.register(extensions, { prefix: '/-/extensions' });


  if (options.web?.enabled) {
    app.log.info('Web server enabled');
    app.register(web);
  }

  done();
};
