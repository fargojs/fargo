import type { FastifyPluginCallback } from 'fastify';

import type { PluginOptions } from '../types';
import { extensions } from './extensions';
import { manifest } from './manifest';
import { vsix } from './vsix';
import { web } from './web';

export const routes: FastifyPluginCallback<PluginOptions> = (zotera, _, next) => {
  zotera.register(extensions, { prefix: '/-/extensions' });
  zotera.register(vsix, { prefix: '/-/extensions/:identifier/vsix' });
  zotera.register(manifest, { prefix: '/-/extensions/:identifier/manifest' });

  if (zotera.config.web?.enabled) {
    zotera.log.info('Web server enabled!!');
    zotera.register(web);
  }

  next();
};