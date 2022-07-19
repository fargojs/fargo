export interface ZoteraConfig {
  /**
   * Logging options
   */
  logging?: ZoteraLoggingOptions;

  /**
   * The directory to store plugins in.
   */
  pluginDir?: string;

  /**
   * Zotera plugins to load.
   */
  plugins?: ZoteraPlugin[];

  /**
   * Use HTTPS
   */
  https?: ZoteraHttpsOptions;

  /**
   * Authentication options
   */
  auth?: ZoteraAuthOptions;

  /**
   * Should web be enabled
   */
  web?: ZoteraWebOptions;
}

export interface ZoteraHttpsOptions {
  key?: string;
  cert?: string;
  ca?: string;
}


export type ZoteraPlugin = string;

export interface ZoteraLoggingOptions {
  type?: 'stdout' | 'file';
  destination?: string;
  level?: LogLevel;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'warn' | 'fatal';

export interface ZoteraAuthOptions {}

export interface ZoteraWebOptions {
  enabled: boolean;
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
