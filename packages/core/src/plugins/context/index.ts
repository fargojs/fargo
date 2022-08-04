import type { PluginContext } from '@zotera/types/api';

import { loggingContext } from './logging';
import { storageContext } from './storage';

export function buildContext<T extends object>(options: T): PluginContext<T> {
  return {
    log: loggingContext,
    auth: {
      register: () => {}
    },
    storage: storageContext,
    options
  };
}
