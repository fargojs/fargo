import type { ExtensionManifest } from './manifest';

export interface ZoteraStorage {
  init(options?: any): Promise<void>;
  search(): Promise<any>;

  getPackage(identifier: string, version?: string): Promise<ExtensionManifest | undefined>;
  getPackageVersions(identifier: string): Promise<string[]>;
}
