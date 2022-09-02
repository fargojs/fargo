import type { ZoteraAuthContext, ZoteraStorageContext } from '@zotera/types/api';

import { AuthManager } from '../../auth';

export const authContext: ZoteraAuthContext = {
  register: (id, auth) => {
    AuthManager.register(id, auth);
  }
};
