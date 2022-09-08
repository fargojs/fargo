import { ZoteraAuth, ZoteraConfig } from '@zotera/types';

import { parseHTPasswd } from './utils';

export class HTPasswd implements ZoteraAuth {
  private users: Map<string, string> = new Map();

  constructor(private readonly config: ZoteraConfig) {
    // Testing htpasswd parsing
    const htpasswd = `
    luxass:gg
    gg:gggg
    `;
    console.log(parseHTPasswd(htpasswd));
  }

  async init() {}

  login(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  register(): Promise<void> {
    if (!this.config.auth?.allowRegistration) {
      throw new Error('Registration is not allowed');
    }
    throw new Error('Method not implemented.');
  }

  publish(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  unpublish(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  access(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
