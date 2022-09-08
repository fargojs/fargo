import { ZoteraAuth } from '@zotera/types';

import { parseHTPasswd } from './utils';

export class HTPasswd implements ZoteraAuth {
  private users: Map<string, string> = new Map();

  constructor() {
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
