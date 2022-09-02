import type { FastifyError, FastifyInstance, FastifyPluginOptions } from 'fastify';
import flugin from 'fastify-plugin';

import { AuthManager } from '@zotera/core';
import type { ZoteraAuth } from '@zotera/types';

export const authDecorator = flugin(
  async (
    zotera: FastifyInstance,
    _: FastifyPluginOptions,
    next: () => FastifyError
  ): Promise<void> => {
    const authManager = new AuthManager(zotera.config.auth);
    await authManager.init();
    zotera.decorate('auth', authManager.auth);

    next();
  }
);

declare module 'fastify' {
  interface FastifyInstance {
    auth: ZoteraAuth;
  }
}
