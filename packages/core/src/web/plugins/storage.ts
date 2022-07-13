import type { FastifyError, FastifyInstance, FastifyPluginOptions } from 'fastify';
import flugin from 'fastify-plugin';

import { Storage } from '../../storage/storage';

export const storagePlugin = flugin(
  (
    zotera: FastifyInstance,
    options: FastifyPluginOptions,
    next: (error?: FastifyError) => void
  ): void => {
    const { config } = options;
    zotera.decorate('storage', new Storage(config));
    next();
  }
);

declare module 'fastify' {
  interface FastifyInstance {
    storage: Storage;
  }
}
