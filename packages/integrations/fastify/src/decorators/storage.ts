import type { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";
import flugin from "fastify-plugin";

import { StorageManager } from "@zotera/core";
import type { ZoteraStorage } from "@zotera/types";

export const storageDecorator = flugin(
  async (
    zotera: FastifyInstance,
    _: FastifyPluginOptions,
    next: () => FastifyError
  ): Promise<void> => {
    const storageManager = new StorageManager(zotera.config.storage);
    await storageManager.init();
    zotera.decorate("storage", storageManager.storage);

    next();
  }
);

declare module "fastify" {
  interface FastifyInstance {
    storage: ZoteraStorage
  }
}
