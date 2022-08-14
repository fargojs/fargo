import type { ExtensionManifest } from './manifest';

export interface ZoteraStorage {
  init(options?: any): Promise<void>;
  search(): Promise<any>;

  addPackage(identifier: string): Promise<void>;

  getPackages(): Promise<ExtensionManifest[]>;
  getPackage(identifier: string, version?: string): Promise<ExtensionManifest | undefined>;
  getPackageVersions(identifier: string): Promise<string[]>;
}
