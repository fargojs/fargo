import type { ExtensionManifest, ZoteraStorage } from '@zotera/types';

// Used when storage entry point is not set, e.g. default configuration
export class LocalStorage implements ZoteraStorage {
  constructor(private readonly location: string) {}

  async init() {}

  async search(): Promise<any> {
    return '';
  }

  getPackages(): Promise<ExtensionManifest[]> {
    throw new Error('Method not implemented.');
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
      repository: 'tt'
    };
  }

  async getPackageVersions(identifier: string): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  addPackage(identifier: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
