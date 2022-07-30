import type { PluginContext } from '@zotera/types/api';

export const context: PluginContext = {
  log: {
    info: (message: string) => console.log('PLUGIN', message),
    warn: (message: string) => console.warn('PLUGIN', message),
    error: (message: string) => console.error('PLUGIN', message),
    debug: (message: string) => console.debug('PLUGIN', message)
  },
  auth: {
    register: () => {}
  },
  storage: {
    register: (id, storage) => {
      console.log('PLUGIN', id, storage);
    }
  }
};
