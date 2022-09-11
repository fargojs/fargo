import bcrypt from 'bcrypt';
import _debug from 'debug';
import crypto from 'node:crypto';
import { appendFile, readFile, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { HTPasswdAlgorithms, ZoteraAuth, ZoteraConfig } from '@zotera/types';

import { parseHTPasswd, verify } from './utils';

const debug = _debug('zotera:core:auth:htpasswd');

export interface HTPasswdUser {
  hash: string;
  algorithm: HTPasswdAlgorithms;
}

export class HTPasswd implements ZoteraAuth {
  private users: Map<string, HTPasswdUser> = new Map();
  private htpasswdPath: string;
  constructor(private readonly config: ZoteraConfig) {
    this.htpasswdPath = resolve(this.config.__location, this.config.auth?.location || '.htpasswd');
  }

  async initialize(): Promise<void> {
    this.loadUsers();
  }

  async login(username: string, password: string): Promise<string | null> {
    debug('authenticate %o', username);
    const user = this.users.get(username);
    if (!user) {
      throw new Error('User not found');
    }

    const { hash, algorithm } = user;

    const isValid = await verify(password, hash, algorithm);

    return isValid ? username : null;
  }

  async register(username: string, password: string): Promise<void> {
    if (!this.config.auth?.allowRegistration) {
      throw new Error('Registration is not allowed');
    }

    const htpasswdUsers = await readFile(this.htpasswdPath, 'utf-8');
    const users = parseHTPasswd(htpasswdUsers);

    if (username !== encodeURIComponent(username)) {
      throw new Error('Username contains invalid characters');
    }
    let hash;
    const algorithm = this.config.auth?.algorithm || 'bcrypt';
    if (algorithm === 'bcrypt') {
      const salt = await bcrypt.genSalt(10);
      hash = await bcrypt.hash(password, salt);
    }

    if (algorithm === 'sha512' || algorithm === 'sha256') {
      hash = crypto.createHash(algorithm).update(password).digest('base64');
    }

    if (!hash) {
      throw new Error(`Algorithm ${algorithm} not supported`);
    }

    if (users[username]) {
      throw new Error('User already exists');
    }

    let user = `${username}:${hash}:${algorithm}\n`;
    if (htpasswdUsers.length && htpasswdUsers[htpasswdUsers.length - 1] !== '\n') {
      user = `\n${user}`;
    }
    await appendFile(this.htpasswdPath, user);
    await this.loadUsers();
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
