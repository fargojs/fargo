import type { FastifyPluginCallback } from 'fastify';

import type { PluginOptions } from '../types';
import { manifest } from './manifest';
import { vsix } from './vsix';

import { web } from './web';

export const routes: FastifyPluginCallback<PluginOptions> = (app, options, done) => {
  app.register(vsix, { prefix: '/-/extensions/:identifier/vsix' });
  app.register(manifest, { prefix: '/-/extensions/:identifier/manifest' });


  if (options.web?.enabled) {
    app.log.info('Web server enabled');
    app.register(web);
  }

  done();
};

// luxas.discord -> manifest for latest version
// luxass.discord/0.0.1 -> manifest for specific version
// luxass.discord/versions -> all versions in an array

// luxass.discord/vsix -> downloads the vsix
// luxass.discord/vsix/0.0.1 -> downloads the vsix for a specific version