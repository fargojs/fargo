import type { ZoteraAuth } from './auth';
import type { ZoteraStorage } from './storage';

export interface PluginContext {
  log: ZoteraLoggingContext;
  auth: ZoteraAuthContext;
  storage: ZoteraStorageContext;
}

interface ZoteraLoggingContext {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  debug(message: string): void;
}

interface ZoteraStorageContext {
  register(storage: ZoteraStorage): void;
}

interface ZoteraAuthContext {
  register(auth: ZoteraAuth): void;
}