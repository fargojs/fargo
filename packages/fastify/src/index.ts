import type { FastifyError, FastifyInstance, FastifyPluginCallback } from 'fastify';
import flugin from 'fastify-plugin';

import { loadPlugins } from '@zotera/core';
import type { PluginContext } from '@zotera/types';

import { routes } from './routes';
import type { PluginOptions } from './types';

const plugin: FastifyPluginCallback<PluginOptions> = flugin(
  async (
    fastify: FastifyInstance,
    options: PluginOptions,
    next: (error?: FastifyError) => void
  ) => {
    const loadedPlugins = await loadPlugins(options);

    loadedPlugins.forEach((plugin) => {
      const context: PluginContext = {
        log: {
          info: (message: string) => console.log(message),
          warn: (message: string) => console.warn(message),
          error: (message: string) => console.error(message),
          debug: (message: string) => console.debug(message)
        },
        auth: {
          register: (plugin) => {}
        },
        storage: {
          register: (plugin) => {}
        }
      };

      plugin?.register(context, { minion: true });
    });
    // fastify.register(storage);
    fastify.register(routes, options);

    next();
  },
  {
    name: 'zotera'
  }
);

export default plugin;
