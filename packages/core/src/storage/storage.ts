import _debug from 'debug';

import type { ExtensionManifest, ZoteraConfig } from '@zotera/types';

const debug = _debug('zotera:core:storage');

export class Storage {
  public constructor(public config: ZoteraConfig) {}

  addExtension() {}

  removeExtension() {}

  addExtensionVersion() {}

  async getPackage(identifier: string): Promise<ExtensionManifest> {
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
    return [];
  }
}
