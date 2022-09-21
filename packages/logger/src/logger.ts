import _debug from 'debug';
import pino from 'pino';

import { ZoteraLoggingConfig } from '@zotera/types';

const debug = _debug('zotera:logger');

export type Logger<T = pino.LoggerOptions> = pino.Logger<T>;

export function setup(options: ZoteraLoggingConfig): Logger<pino.LoggerOptions> {
  let destination: ReturnType<typeof pino.destination>;
  let pinoConfig: pino.LoggerOptions = {
    level: options.level,
    serializers: {
      err: pino.stdSerializers.err,
      req: pino.stdSerializers.req,
      res: pino.stdSerializers.res
    }
  };

  if (options.type === 'file') {
    debug('file logging is used');
    destination = pino.destination(options.destination);
    process.on('SIGUSR2', () => destination.reopen());
  } else {
    destination = pino.destination(1);
    debug('stdout logging is used');
  }

  if (process.env.NODE_ENV !== 'production') {
    pinoConfig = {
      ...pinoConfig,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: options.type !== 'file',
          destination: options.destination,
          ignore: 'pid,hostname'
        }
      }
    };
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

let logger: pino.Logger;

// TODO: Make logger create log files based on time.
export function initialize(options: ZoteraLoggingConfig): Logger<pino.LoggerOptions> {
  debug('initializing logger');
  console.log(options);

  if (logger) return logger;
  logger = setup(options);
  return logger;
}
