import type { ExtensionManifest, ZoteraStorage } from '@zotera/types';

// Used when storage entry point is not set, e.g. default configuration
export class LocalStorage implements ZoteraStorage {

  async init() {
    throw new Error('Method not implemented.');
  }

  async search(): Promise<any> {
    return '';
  }

  async getPackage(
    identifier: string,
    version?: string | undefined
  ): Promise<ExtensionManifest | undefined> {
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
    throw new Error('Method not implemented.');
  }
}
