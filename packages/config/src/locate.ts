import _debug from 'debug';
import { join, resolve } from 'path';

import { writeConfig } from './create';
import { fileExists, folderExists } from './utils';

const CONFIG_FILE_NAME = 'zotera.yaml';
const debug = _debug('zotera:config:locate');

export function locate(config?: string): string {
  if (config) {
    return resolve(config);
  }

  const possibleDirs = getPossibleDirs();
  debug('%o possible locations found', possibleDirs.length);

  const existingConfig = possibleDirs.find(fileExists);

  if (existingConfig) {
    debug('Found config file at %s', existingConfig);
    return existingConfig;
  }

  return writeConfig(possibleDirs[0]);
}

function getPossibleDirs(): string[] {
  return [locateXDG(), locateWIN(), locateRelative()].reduce((acc, dir) => {
    if (dir) {
      debug('directory detected path %s', dir);
      acc.push(dir);
    }
    return acc;
  }, [] as string[]);
}

function locateWIN(): string | undefined {
  if (process.platform === 'win32' && process.env.APPDATA && folderExists(process.env.APPDATA)) {
    debug('is windows appdata: %s', process.env.APPDATA);
    return resolve(join(process.env.APPDATA, 'zotera', CONFIG_FILE_NAME));
  }
}

function locateXDG(): string | undefined {
  // prettier-ignore
  const xdg = process.env.XDG_CONFIG_HOME
    || (process.env.HOME && join(process.env.HOME, '.config'));
  if (xdg && folderExists(xdg)) {
    debug('XDGConfig folder path %s', xdg);
    return join(xdg, 'zotera', CONFIG_FILE_NAME);
  }
}

function locateRelative(): string {
  return resolve(join('.', 'zotera', CONFIG_FILE_NAME));
}
