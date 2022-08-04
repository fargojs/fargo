import type { FastifyError, FastifyInstance, FastifyPluginOptions } from 'fastify';
import flugin from 'fastify-plugin';

import { PluginManager } from '@zotera/core';
import type { ZoteraStorage } from '@zotera/types';

export const pluginsDecorator = flugin(
  async (zotera: FastifyInstance, _: FastifyPluginOptions, next: () => FastifyError): Promise<void> => {
    const pluginManager = new PluginManager(zotera.config);
    // await pluginManager.init();
    // zotera.decorate('storage', pluginManager.storage);
    console.log(pluginManager);

    next();
  }
);

declare module 'fastify' {
  interface FastifyInstance {
    storage: ZoteraStorage;
  }
}
