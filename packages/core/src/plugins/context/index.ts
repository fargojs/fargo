import { ZoteraConfig } from '@zotera/types';
import { PluginContext } from '@zotera/types/api';

import { authContext } from './auth';
import { loggingContext } from './logging';
import { routingContext } from './routing';
import { storageContext } from './storage';

export function buildContext<T extends object>(config: ZoteraConfig, options: T): PluginContext<T> {
  return {
    log: loggingContext,
    auth: authContext,
    storage: storageContext,
    routing: routingContext,
    options,
    config
  };
}
