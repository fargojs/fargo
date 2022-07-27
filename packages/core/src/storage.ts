import _debug from 'debug';

import type { ExtensionManifest, ZoteraConfig } from '@zotera/types';

const debug = _debug('zotera:core:storage');

export class Storage {
  public constructor(public config: ZoteraConfig) {}

  addExtension() {}

  removeExtension() {}

  addExtensionVersion() {}

  async getPackage(identifier: string): Promise<ExtensionManifest> {
    debug('getPackage %s', identifier);
    return {
      name: '',
      identifier: '',
      version: '',
      description: '',
      readme: '',
      displayName: '',
      categories: [],
      icon: '',
      releasedOn: '',
      lastUpdated: '',
      license: '',
      repository: ''
    };
  }

  async getPackageByVersion(identifier: string, version: string): Promise<ExtensionManifest> {
    debug('getPackage %s with version %s', identifier, version);
    return {
      name: '',
      identifier: '',
      version: '',
      description: '',
      readme: '',
      displayName: '',
      categories: [],
      icon: '',
      releasedOn: '',
      lastUpdated: '',
      license: '',
      repository: ''
    };
  }

  async getPackageVersions(identifier: string): Promise<string[]> {
    debug('getPackageVersions %s', identifier);
    return [];
  }
}
