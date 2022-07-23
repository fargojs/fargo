import type { PluginContext } from '@zotera/types';

interface PluginOptions {
  minion: boolean;
}

export function register(ctx: PluginContext, options: PluginOptions) {
  ctx.log.info('Registering routing plugin');
  ctx.log.info('Minion: ' + options.minion);
}
