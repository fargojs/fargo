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
  plugins?: ZoteraPluginOptions;

  /**
   * Use HTTPS
   */
  https?: ZoteraHttpsOptions;

  /**
   * Authentication options
   */
  auth?: ZoteraAuthOptions;
}

export interface ZoteraHttpsOptions {
  key?: string;
  cert?: string;
  ca?: string;
}

export interface ZoteraPluginOptions {
  [key: string]: any;
}

export interface ZoteraLoggingOptions {
  type?: 'stdout' | 'file';
  path?: string;
  level?: LogLevel;
  format?: string;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'warn' | 'fatal';

export interface ZoteraAuthOptions {

}