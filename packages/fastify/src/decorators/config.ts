import type { FastifyError, FastifyInstance, FastifyPluginOptions } from 'fastify';
import flugin from 'fastify-plugin';

import type { ZoteraConfig } from '@zotera/types';

export const configDecorator = flugin(
  (zotera: FastifyInstance, options: FastifyPluginOptions, next: () => FastifyError): void => {
    zotera.decorate('config', options);
    next();
  }
);

declare module 'fastify' {
  interface FastifyInstance {
    config: ZoteraConfig;
  }
}
