import type { ZoteraAuth } from './auth';
import type { ZoteraStorage } from './storage';

export { ZoteraAuth, ZoteraStorage };

export interface PluginContext {
  log: ZoteraLoggingContext;
  auth: ZoteraAuthContext;
  storage: ZoteraStorageContext;
}

export interface ZoteraLoggingContext {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  debug(message: string): void;
}

export interface ZoteraStorageContext {
  register(id: string, storage: ZoteraStorage): void;
}

export interface ZoteraAuthContext {
  register(auth: ZoteraAuth): void;
}
