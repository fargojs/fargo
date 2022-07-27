import type { FastifyPluginCallback } from 'fastify';

import type { PluginOptions } from '../types';
import { readme } from './readme';
import { manifest } from './manifest';
import { vsix } from './vsix';

import { web } from './web';

export const routes: FastifyPluginCallback<PluginOptions> = (app, options, done) => {
  app.register(vsix, { prefix: '/-/extensions/vsix' });
  app.register(manifest, { prefix: '/-/extensions/manifest' });
  app.register(readme, { prefix: '/-/extensions/readme' });


  if (options.web?.enabled) {
    app.log.info('Web server enabled');
    app.register(web);
  }

  done();
};
