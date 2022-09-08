import type { PluginContext } from './api';

export * from './storage';
export * from './auth';
export * from './manifest';

export interface ZoteraConfig {
  /**
   * The path where the configuration file is located.
   * @internal
   */
  __location: string;

  /**
   * Logging options
   */
  logging?: ZoteraLoggingConfig;

  /**
   * The directory to store plugins in.
   */
  pluginDir: string;

  /**
   * Allow loading of unscoped plugins.
   */
  allowUnscopedPlugins?: boolean;

  /**
   * Zotera plugins to load.
   */
  plugins?: ZoteraPluginsConfig;

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

export interface ZoteraPlugin {
  register(ctx: PluginContext<any>): void | Promise<void>;
  options?: any;
}

export type ZoteraPluginsConfig = (string | ZoteraPluginWithOptions)[];
export interface ZoteraPluginWithOptions {
  [key: string]: any;
}

export interface ZoteraLoggingConfig {
  type?: 'stdout' | 'file';
  destination?: string;
  level?: LogLevel;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'warn' | 'fatal';

export interface ZoteraAuthConfig {
  /**
   * Should everyone be allowed to download extensions.
   */
  allowAnonymousDownload?: boolean;
  /**
   * Auth provider to use.
   * These are registered through `auth.register()`.
   */
  provider?: string;
  algorithm?: 'sha1' | 'md5' | 'bcrypt';
  location?: string;
}

export interface ZoteraStorageConfig {
  provider?: string;
  location?: string;
}

export interface WebFooterOptions {
  message?: string;
  copyright?: string;
}

export interface ZoteraWebConfig {
  title?: string;
  logo?: string;
  footer?: WebFooterOptions;
}

export type OmitSafe<T extends object, K extends keyof T> = Omit<T, K>;
// export type NodeOptions = OmitSafe<ZoteraConfig, 'logging' | 'pluginDir' | '__location'>;
