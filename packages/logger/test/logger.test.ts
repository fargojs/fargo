import { mkdtemp, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { setTimeout } from 'node:timers/promises';
import { beforeAll, describe, expect, it } from 'vitest';

import { setup } from '../src';

const readLog = async (logPath: string) => {
  await setTimeout(1000, 'resolved');
  return readFile(logPath, 'utf8');
};

let tempDir: string;

beforeAll(async () => {
  tempDir = await mkdtemp(path.join(os.tmpdir(), 'zotera-logger-'));
});

describe('logger', () => {
  describe('file', () => {
    it('output to file with info level', async () => {
      const file = path.join(tempDir, 'test1.log');
      const logger = setup({
        level: 'info',
        type: 'file',
        destination: file
      });
      logger.info('info');
      logger.debug('debug');
      logger.error('error');
      logger.trace('trace');
      logger.warn('warn');

      const content = await readLog(file);

      expect(content).toMatch(/\[\S+\]\s+(INFO|ERROR|WARN):.*/g);
    });

    it('output to file with all levels', async () => {
      const file = path.join(tempDir, 'test2.log');
      const logger = setup({
        level: 'trace',
        type: 'file',
        destination: file
      });
      logger.info('info');
      logger.debug('debug');
      logger.error('error');
      logger.trace('trace');
      logger.warn('warn');

      const content = await readLog(file);

      expect(content).toMatch(/\[\S+\]\s+(INFO|DEBUG|ERROR|TRACE|WARN):.*/g);
    });
  });

  // TODO: Add tests for stdout - research how to spy on
});
