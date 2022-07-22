import type { ZoteraStorage } from './storage';

export interface PluginContext {
  storage: ZoteraStorageContext;
}

interface ZoteraStorageContext {
  register(storage: ZoteraStorage): void;
}
