import { PluginContext } from '@zotera/types/api';

import { authContext } from './auth';
import { loggingContext } from './logging';
import { storageContext } from './storage';

export function buildContext<T extends object>(options: T): PluginContext<T> {
  return {
    log: loggingContext,
    auth: authContext,
    storage: storageContext,
    options
  };
}
