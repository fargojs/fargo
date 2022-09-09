import type { PluginContext, ZoteraAuth } from '@zotera/types/api';

interface PluginOptions {
  minion: boolean;
}

export function register(ctx: PluginContext<PluginOptions>) {
  ctx.log.info('Registering auth plugin');
  ctx.log.info('Minion: ' + ctx.options.minion);


  const customAuth = new AuthPlugin();

  ctx.auth.register('custom-auth', customAuth);
}

export const options = {
  minion: {
    type: 'boolean',
    default: false,
  }
}

class AuthPlugin implements ZoteraAuth {
  init(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  login(username: string, password: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  register(username: string, password: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  publish(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  unpublish(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  access(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}