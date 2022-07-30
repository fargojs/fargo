import _debug from 'debug';

import type { ZoteraStorage, ZoteraStorageConfig } from '@zotera/types';

import { LocalStorage } from './local';

const debug = _debug('zotera:core:storage:manager');

export class StorageManager {
  private static readonly storages: Record<string, ZoteraStorage> = {};
  public storage: ZoteraStorage = new LocalStorage();
  public constructor(private readonly storageConfig: ZoteraStorageConfig) {
    debug('constructor(%o)', storageConfig);

    if (!storageConfig) {
      debug('Storage configuration not found, using default');
    }
  }

  async init() {
    debug('storage#init()');
    const isStorageLoaded = StorageManager.storages[this.storageConfig.id];
    if (!isStorageLoaded) {
      debug('Storage with id %s not found', this.storageConfig.id);
    } else {
      this.storage = isStorageLoaded;
    }
    await this.storage.init(this.storageConfig.options);
  }

  static register(id: string, storage: ZoteraStorage) {
    debug('storage#register(%s, %s)', id, storage);
    if (this.storages[id]) {
      throw new Error(`Storage with id ${id} already registered`);
    }
    this.storages[id] = storage;
  }
}
