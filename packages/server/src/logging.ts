import _debug from 'debug';
import pino from 'pino';
import type { Logger } from 'pino';

import type { ZoteraLoggingOptions } from '@zotera/types';

const DEFAULT_LOGGING_OPTIONS: ZoteraLoggingOptions = {
  level: 'info',
  type: 'stdout'
};

const debug = _debug('zotera:server:logging');

/**
 * Setup logging for zotera core.
 * @param config Zotera Logging options
 * @returns {Logger} Pino Logger
 */
export function setup(config?: ZoteraLoggingOptions): Logger {
  const loggingConfig: ZoteraLoggingOptions = { ...DEFAULT_LOGGING_OPTIONS, ...config };
  let destination = pino.destination(1);
  const pinoConfig: pino.LoggerOptions = {
    level: loggingConfig.level,
    serializers: {
      err: pino.stdSerializers.err,
      req: pino.stdSerializers.req,
      res: pino.stdSerializers.res
    }
  };

  if (loggingConfig.type === 'file') {
    debug('file logging is used');
    destination = pino.destination(loggingConfig.destination);
    process.on('SIGUSR2', () => destination.reopen());
  } else {
    debug('stdout logging is used');
  }
  const logger = pino(pinoConfig, destination);

  if (process.env.DEBUG) {
    logger.on('level-change', (level, value, preLevel, preValue) =>
      debug('%s (%d) was changed to %s (%d)', level, value, preLevel, preValue)
    );
  }

  if (process.env.NODE_ENV === 'production') {
    const finalHandler = pino.final(logger, (err, finalLogger, event) => {
      finalLogger.info(`${event} caught`);
      if (err) {
        finalLogger.error(err, 'error caused exit');
      }
      process.exit(err ? 1 : 0);
    });

    process.on('uncaughtException', (err) => finalHandler(err, 'uncaughtException'));
    process.on('unhandledRejection', (err) => finalHandler(err as Error, 'unhandledRejection'));
    process.on('beforeExit', () => finalHandler(null, 'beforeExit'));
    process.on('exit', () => finalHandler(null, 'exit'));
    process.on('uncaughtException', (err) => finalHandler(err, 'uncaughtException'));
    process.on('SIGINT', () => finalHandler(null, 'SIGINT'));
    process.on('SIGQUIT', () => finalHandler(null, 'SIGQUIT'));
    process.on('SIGTERM', () => finalHandler(null, 'SIGTERM'));
  }

  return logger;
}
