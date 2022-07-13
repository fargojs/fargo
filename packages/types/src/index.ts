export interface ZoteraConfig {
  /**
   * Logging options
   */
  logging?: ZoteraLoggingOptions;

  /**
   * The directory to store plugin in.
   */
  pluginDir?: string;

  /**
   * Zotera plugins to load.
   */
  plugins: ZoteraPluginOptions;
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
