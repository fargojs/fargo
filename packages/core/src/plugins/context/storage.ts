import { ZoteraStorageContext } from '@zotera/types/api';

import { StorageManager } from '../../storage';

export const storageContext: ZoteraStorageContext = {
  register: (id, storage) => {
    StorageManager.register(id, storage);
  }
};
