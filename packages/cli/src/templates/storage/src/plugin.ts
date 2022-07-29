import type { PluginContext, ZoteraStorage, ExtensionManifest } from '@zotera/types/api';

interface PluginOptions {
  minion: boolean;
}

export function register(ctx: PluginContext, options: PluginOptions) {
  ctx.log.info('Registering routing plugin');
  ctx.log.info('Minion: ' + options.minion);

  const customStorage = new CustomStorage();

  ctx.storage.register('custom-storage', customStorage);
}


class CustomStorage implements ZoteraStorage {

  public async search() {
    return [];
  }

  public async getPackage(identifier: string, version?: string): Promise<ExtensionManifest | undefined> {
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
    }
  }
  public async getPackageVersions(identifier: string): Promise<string[]> {
    return []
  }
}