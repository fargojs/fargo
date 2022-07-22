import { PluginContext, ZoteraStorage } from '@zotera/api';

export function register(ctx: PluginContext) {
  const storage = new StorageAPI();
  ctx.storage.register(storage);
}

class StorageAPI extends ZoteraStorage {}
