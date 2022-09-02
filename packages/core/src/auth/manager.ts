import _debug from 'debug';

import { ZoteraAuth, ZoteraAuthConfig } from '@zotera/types';

const debug = _debug('zotera:core:auth:manager');

export class AuthManager {
  private static readonly auths: Map<string, ZoteraAuth> = new Map();
  public auth: ZoteraAuth | undefined;

  public constructor(private readonly authConfig: ZoteraAuthConfig) {
    if (!authConfig.provider) {
      debug('Custom storage configuration not found, using default');
      // this.auth = new HTPasswd();
    }
  }

  async init() {
    if (this.authConfig.provider) {
      const auth = AuthManager.auths.get(this.authConfig.provider);
      if (!auth) {
        throw new Error(`Auth with id ${this.authConfig.provider} not found`);
      }
      this.auth = auth;
    }

    if (!this.auth) {
      throw new Error('Auth not found, please check your configuration');
    }
    await this.auth.init();
  }

  static register(id: string, auth: ZoteraAuth) {
    debug('auth#register(%s)', id, auth);
    const existing = AuthManager.auths.get(id);
    if (existing) {
      throw new Error(`Storage with id ${id} already registered`);
    }
    AuthManager.auths.set(id, auth);
  }
}
