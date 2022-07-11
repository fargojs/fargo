export interface ZoteraConfig {
  /**
   * Logging options
   */
  logging?: ZoteraConfigOptions;
}

export interface ZoteraConfigOptions {
  type?: 'stdout' | 'file';
  path?: string;
  level?: LogLevel;
  format?: string;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'warn' | 'fatal';
