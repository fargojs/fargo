import type { ZoteraStorage } from './storage';

interface PluginContext {
  storage: ZoteraStorageContext;
}

interface ZoteraStorageContext {
  register(storage: ZoteraStorage): void;
}

export { PluginContext, ZoteraStorage };
