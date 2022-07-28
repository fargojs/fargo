import type { PluginContext } from './api';

export * from './storage';
export * from './auth';

export interface ZoteraConfig {
  /**
   * Used for development, will be moved at some point.
   */
  configPath: string;

  /**
   * Logging options
   */
  logging?: ZoteraLoggingOptions;

  /**
   * The directory to store plugins in.
   */
  pluginDir?: string;

  /**
   * Allow loading of unscoped plugins.
   */
  allowUnscopedPlugins?: boolean;

  /**
   * Zotera plugins to load.
   */
  plugins?: ZoteraPlugin[];

  /**
   * HTTPS options
   */
  https?: ZoteraHttpsOptions;

  /**
   * Authentication options
   */
  auth?: ZoteraAuthOptions;

  /**
   * Web options
   */
  web?: ZoteraWebOptions;

  /**
   * Storage options
   */
  storage?: ZoteraStorageOptions;
}

export interface ZoteraHttpsOptions {
  key?: string;
  cert?: string;
  ca?: string;
}

export interface ZoteraPluginImpl {
  register(ctx: PluginContext, options?: any): void | Promise<void>;
  options?: any;
}
export type ZoteraPlugin = string | ZoteraPluginWithOptions;
export interface ZoteraPluginWithOptions {
  [key: string]: any;
}

export interface ZoteraLoggingOptions {
  type?: 'stdout' | 'file';
  destination?: string;
  level?: LogLevel;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'warn' | 'fatal';

export interface ZoteraAuthOptions {}

export interface ZoteraStorageOptions {
  [key: string]: any;
}

export interface ZoteraWebOptions {
  enabled: boolean;
}

export interface PluginManifest {
  name: string;
  version: string;
  main: string;
}

export interface PluginFile {
  path: string;
  localPath: string;
}

export interface ExtensionManifest {
  name: string;
  identifier: string;
  displayName: string;
  description: string;
  readme: string;
  version: string;
  icon: string;
  categories: string[];
  releasedOn: string;
  lastUpdated: string;
  license: string;
  repository: string;
}
