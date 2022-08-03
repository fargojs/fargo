import type { FastifyError, FastifyInstance, FastifyPluginCallback } from 'fastify';
import flugin from 'fastify-plugin';

import { loadPlugins } from '@zotera/core';
// import { storagePlugin } from './plugins/storage';
// import { configPlugin } from './plugins/config';
// import { routes } from './routes';
import type { PluginOptions } from './types';
import { ping } from './routes/ping';

const plugin: FastifyPluginCallback<PluginOptions> = flugin(
  async (
    app: FastifyInstance,
    options: PluginOptions,
    next: (error?: FastifyError) => void
  ) => {
    // Setup plugin loading
    loadPlugins(options);
    // Loading plugins
    // loadPlugins(options);


    app.register(ping, {
      prefix: '/-/ping'
    });
    // fastify.register(configPlugin, options);
    // fastify.register(storagePlugin);
    // fastify.register(routes, options);

    next();
  },
  {
    name: 'zotera'
  }
);

export default plugin;
