import _debug from 'debug';

import { ZoteraAuth, ZoteraConfig } from '@zotera/types';

import { HTPasswd } from './htpasswd';

const debug = _debug('zotera:core:auth:manager');

export class AuthManager {
  private static readonly auths: Map<string, ZoteraAuth> = new Map();
  public auth: ZoteraAuth | undefined;

  public constructor(private readonly config: ZoteraConfig) {
    if (!config.auth?.provider || config.auth.provider === 'htpasswd') {
      debug('Custom auth configuration not found, using default');
      this.auth = new HTPasswd(config);
    }
  }

  async init() {
    if (this.config.auth?.provider) {
      const auth = AuthManager.auths.get(this.config.auth?.provider);
      if (!auth) {
        throw new Error(`Auth with id ${this.config.auth?.provider} not found`);
      }
      this.auth = auth;
    }

    if (!this.auth) {
      throw new Error('Auth not found, please check your configuration');
    }
    await this.auth.initialize();
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
