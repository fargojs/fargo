import deepmerge from 'deepmerge';
import type { FastifyError, FastifyInstance, FastifyPluginOptions } from 'fastify';
import flugin from 'fastify-plugin';

import { DEFAULT_CONFIGURATION_OBJECT } from '@zotera/config';
import type { ZoteraConfig } from '@zotera/types';

export const configDecorator = flugin(
  (zotera: FastifyInstance, options: FastifyPluginOptions, next: () => FastifyError): void => {
    const mergedConfiguration = deepmerge(DEFAULT_CONFIGURATION_OBJECT, options);
    zotera.decorate('config', options);
    next();
  }
);

declare module 'fastify' {
  interface FastifyInstance {
    config: ZoteraConfig;
  }
}
