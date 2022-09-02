import type { FastifyError, FastifyInstance, FastifyPluginCallback } from 'fastify';
import flugin from 'fastify-plugin';

import { loadPlugins } from '@zotera/core';

import { configDecorator } from './decorators/config';
import { storageDecorator } from './decorators/storage';
import { routes } from './routes';
import { ping } from './routes/ping';
import type { PluginOptions } from './types';
import { authDecorator } from "./decorators/auth";

const plugin: FastifyPluginCallback<PluginOptions> = flugin(
  async (app: FastifyInstance, options: PluginOptions, next: (error?: FastifyError) => void) => {
    app.register(configDecorator, options).after(async () => {
      // This is running after the config decorator is attached.
      await loadPlugins(app.config);
    });

    app.register(storageDecorator);
    app.register(authDecorator);
    
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
