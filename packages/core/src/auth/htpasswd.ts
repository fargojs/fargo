import _debug from 'debug';
import crypto from 'node:crypto';
import { appendFile, readFile, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { ZoteraAuth, ZoteraConfig } from '@zotera/types';

import { parseHTPasswd } from './utils';

const debug = _debug('zotera:core:auth:htpasswd');

export class HTPasswd implements ZoteraAuth {
  private users: Map<string, string> = new Map();
  private htpasswdPath: string;
  constructor(private readonly config: ZoteraConfig) {
    this.htpasswdPath = resolve(this.config.__location, this.config.auth?.location || '.htpasswd');
  }

  async initialize(): Promise<void> {
    this.loadUsers();
  }

  login(): Promise<void> {
    throw new Error('Method not implemented. 444');
  }

  async register(username: string, password: string): Promise<void> {
    if (!this.config.auth?.allowRegistration) {
      throw new Error('Registration is not allowed');
    }

    try {
      const htpasswdUsers = await readFile(this.htpasswdPath, 'utf-8');

      if (username !== encodeURIComponent(username)) {
        throw new Error('Username contains invalid characters');
      }

      // TODO: Implement the other algorithms
      const hash = `{SHA}${crypto.createHash('sha1').update(password, 'utf-8').digest('base64')}`;
      let user = `${username}:${hash}\n`;
      if (htpasswdUsers.length && htpasswdUsers[htpasswdUsers.length - 1] !== '\n') {
        user = `\n${user}`;
      }
      await appendFile(this.htpasswdPath, user);
      await this.loadUsers();
    } catch (e) {
      throw new Error('Registration failed');
    }
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

  private async loadUsers(): Promise<void> {
    try {
      const stats = await stat(this.htpasswdPath);

      if (!stats.isFile()) {
        throw new Error(`Path ${this.htpasswdPath} is not a file`);
      }

      const contents = await readFile(this.htpasswdPath, 'utf-8');

      this.users = new Map(Object.entries(parseHTPasswd(contents)));
    } catch (e) {
      if (e.code === 'ENOENT') {
        debug('No htpasswd file found, creating one');
        await writeFile(this.htpasswdPath, '');
      }
    }
  }
}
