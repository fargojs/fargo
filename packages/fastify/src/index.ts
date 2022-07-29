import type { FastifyError, FastifyInstance, FastifyPluginCallback } from 'fastify';
import flugin from 'fastify-plugin';

import { loadPlugins } from '@zotera/core';

import { storagePlugin } from './plugins/storage';
import { routes } from './routes';
import type { PluginOptions } from './types';

const plugin: FastifyPluginCallback<PluginOptions> = flugin(
  async (
    fastify: FastifyInstance,
    options: PluginOptions,
    next: (error?: FastifyError) => void
  ) => {
    await loadPlugins(options);

    fastify.register(storagePlugin);
    fastify.register(routes, options);

    next();
  },
  {
    name: 'zotera'
  }
);

export default plugin;
