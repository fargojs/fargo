import type { PluginContext } from '@zotera/types';

export const context: PluginContext = {
  log: {
    info: (message: string) => console.log(message),
    warn: (message: string) => console.warn(message),
    error: (message: string) => console.error(message),
    debug: (message: string) => console.debug(message)
  },
  auth: {
    register: (plugin) => {}
  },
  storage: {
    register: (plugin) => {}
  }
};
