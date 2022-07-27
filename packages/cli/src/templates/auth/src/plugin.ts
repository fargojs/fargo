import type { PluginContext } from '@zotera/types/api';

interface PluginOptions {
  minion: boolean;
}

export function register(ctx: PluginContext, options: PluginOptions) {
  ctx.log.info('Registering routing plugin');
  ctx.log.info('Minion: ' + options.minion);
}
