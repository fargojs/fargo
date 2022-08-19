import _debug from 'debug';

import type { ZoteraStorage, ZoteraStorageConfig } from '@zotera/types';

import { LocalStorage } from './local';

const debug = _debug('zotera:core:storage:manager');

export class StorageManager {
  private static readonly storages: Map<string, ZoteraStorage> = new Map();
  public storage: ZoteraStorage | undefined;

  public constructor(private readonly storageConfig: ZoteraStorageConfig) {
    if (!storageConfig.provider) {
      debug('Custom storage configuration not found, using default');
      this.storage = new LocalStorage(storageConfig.location || "");
    }
  }

  async init() {
    if (this.storageConfig.provider) {
      const storage = StorageManager.storages.get(this.storageConfig.provider);
      if (!storage) {
        throw new Error(`Storage with id ${this.storageConfig.provider} not found`);
      }
      this.storage = storage;
    }

    if (!this.storage) {
      throw new Error('Storage not found, please check your configuration');
    }
    await this.storage.init();
  }

  static register(id: string, storage: ZoteraStorage) {
    debug('storage#register(%s)', id, storage);
    const existing = StorageManager.storages.get(id);
    if (existing) {
      throw new Error(`Storage with id ${id} already registered`);
    }
    StorageManager.storages.set(id, storage);
  }
}
