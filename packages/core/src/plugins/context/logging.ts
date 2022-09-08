import { ZoteraLoggingContext } from '@zotera/types/api';

export const loggingContext: ZoteraLoggingContext = {
  info: (message: string) => console.log('PLUGIN', message),
  warn: (message: string) => console.warn('PLUGIN', message),
  error: (message: string) => console.error('PLUGIN', message),
  debug: (message: string) => console.debug('PLUGIN', message)
};
