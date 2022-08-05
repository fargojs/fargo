import _debug from 'debug';

import type { ZoteraStorage, ZoteraStorageConfig } from '@zotera/types';

import { LocalStorage } from './local';

const debug = _debug('zotera:core:storage:manager');

export class StorageManager {
  private static readonly storages: Record<string, ZoteraStorage> = {};
  public storage: ZoteraStorage = new LocalStorage();
  public constructor(private readonly storageConfig: ZoteraStorageConfig) {
    if (!storageConfig) {
      debug('Custom storage configuration not found, using default');
    }
  }

  async init() {
    const storage = StorageManager.storages[this.storageConfig];

    if (!storage) {
      debug('Storage with id %s not found', this.storageConfig);
    } else {
      this.storage = storage;
    }
    // Just for now.
    await this.storage.init();
  }

  static register(id: string, storage: ZoteraStorage) {
    debug('storage#register(%s)', id, storage);
    if (this.storages[id]) {
      throw new Error(`Storage with id ${id} already registered`);
    }
    this.storages[id] = storage;
  }
}
