import type { FastifyError, FastifyInstance, FastifyPluginCallback } from 'fastify';
import flugin from 'fastify-plugin';

import { loadPlugins } from '@zotera/core';

import { routes } from './routes';
import type { PluginOptions } from './types';

const plugin: FastifyPluginCallback<PluginOptions> = flugin(
  (fastify: FastifyInstance, options: PluginOptions, next: (error?: FastifyError) => void) => {
    loadPlugins(options);
    // fastify.register(storage);
    fastify.register(routes, options);

    next();
  },
  {
    name: 'zotera'
  }
);

export default plugin;
