import type { PluginContext, ZoteraStorage } from '@zotera/api';

interface PluginOptions {
  minion: boolean;
}

export function register(ctx: PluginContext, options: PluginOptions) {
  const storage = new StorageAPI();
  ctx.storage.register(storage);
}

class StorageAPI extends ZoteraStorage {}
