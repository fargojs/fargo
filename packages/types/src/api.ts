import type { ZoteraAuth } from './auth';
import type { ZoteraStorage } from './storage';

export { ZoteraAuth, ZoteraStorage };

export interface PluginContext<T extends object> {
  log: ZoteraLoggingContext;
  auth: ZoteraAuthContext;
  storage: ZoteraStorageContext;
  options: T;
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
