import type { PluginContext } from './api';

export * from './storage';
export * from './auth';
export * from './manifest';

export interface ZoteraConfig {
  /**
   * Logging options
   */
  logging?: ZoteraLoggingConfig;

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
  https?: ZoteraHttpsConfig;

  /**
   * Authentication options
   */
  auth?: ZoteraAuthConfig;

  /**
   * Web options
   */
  web?: ZoteraWebConfig;

  /**
   * Id of the storage, that got registered
   */
  storage?: ZoteraStorageConfig;
}

export interface ZoteraHttpsConfig {
  key?: string;
  cert?: string;
  ca?: string;
}

export interface ZoteraPluginImpl {
  register(ctx: PluginContext<any>): void | Promise<void>;
  options?: any;
}

export type ZoteraPlugin = string | ZoteraPluginWithOptions;
export interface ZoteraPluginWithOptions {
  [key: string]: any;
}

export interface ZoteraLoggingConfig {
  type?: 'stdout' | 'file';
  destination?: string;
  level?: LogLevel;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'warn' | 'fatal';

export interface ZoteraAuthConfig {}

export type ZoteraStorageConfig = string;

export interface ZoteraWebConfig {
  enabled: boolean;
}