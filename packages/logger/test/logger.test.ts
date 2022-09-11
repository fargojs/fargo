import { mkdtemp, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { setTimeout } from 'node:timers/promises';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { initialize } from '../src';

const readLog = async (logPath: string) => {
  await setTimeout(1000, 'resolved');
  return readFile(logPath, 'utf8');
};

let tempFolder: string;
beforeAll(async () => {
  tempFolder = await mkdtemp(path.join(os.tmpdir(), 'zotera-logger-'));
});

describe('logger', () => {
  vi.fn();
  it('output to file', async () => {
    const file = path.join(tempFolder, 'test-1.log');
    const logger = initialize({
      level: 'info',
      type: 'file',
      destination: file
    });
    logger.info('info');
    logger.debug('debug');
    logger.error('error');

    const content = await readLog(file);
    console.log(content);
  });
});
