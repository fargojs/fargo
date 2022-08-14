import type { FastifyError, FastifyInstance, FastifyPluginCallback } from 'fastify';
import flugin from 'fastify-plugin';

import { loadPlugins } from '@zotera/core';

import { configDecorator } from './decorators/config';
import { storageDecorator } from './decorators/storage';
import { routes } from './routes';
import { ping } from './routes/ping';
import type { PluginOptions } from './types';

const plugin: FastifyPluginCallback<PluginOptions> = flugin(
  async (app: FastifyInstance, options: PluginOptions, next: (error?: FastifyError) => void) => {
    app.register(configDecorator, options);

    // Setup plugin loading
    loadPlugins(app.config);

    // This needs to be after the plugins are loaded
    // so that the plugins that are a storage plugin
    // will be available to the storage decorator
    app.register(storageDecorator);

    app.register(ping, {
      prefix: '/-/ping'
    });

    app.register(routes);
    next();
  },
  {
    name: 'zotera'
  }
);

export default plugin;
