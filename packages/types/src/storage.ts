import type { ExtensionManifest } from './manifest';

export interface ZoteraStorage {
  search(): Promise<any>;

  getPackage(identifier: string, version?: string): Promise<ExtensionManifest | undefined>;
  getPackageVersions(identifier: string): Promise<string[]>;
}
