export interface FargoOptions {
  /**
   * Logging options
   */
  logging?: FargoLoggingOptions;
}

export interface FargoLoggingOptions {
  type?: "stdout" | "file";
  path?: string;
  level?: LogLevel;
  format?: string;

}

export type LogLevel = "debug" | "info" | "warn" | "warn" | "fatal";