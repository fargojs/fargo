import type { FastifyError, FastifyInstance, FastifyPluginCallback } from 'fastify';
import flugin from 'fastify-plugin';

import { routes } from './routes';
import type { PluginOptions } from './types';

const plugin: FastifyPluginCallback = flugin(
  (fastify: FastifyInstance, options: PluginOptions, next: (error?: FastifyError) => void) => {
    console.log('Hello from plugin');
    console.log(JSON.stringify(options));
    fastify.register(routes, options);

    next();
  },
  {
    name: 'zotera'
  }
);

export default plugin;
