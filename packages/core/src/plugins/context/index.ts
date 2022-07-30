import type { PluginContext } from '@zotera/types/api';

import { loggingContext } from './logging';
import { storageContext } from './storage';

export const context: PluginContext = Object.freeze({
  log: loggingContext,
  auth: {
    register: () => {}
  },
  storage: storageContext
});
