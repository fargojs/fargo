import _debug from 'debug';
import envPaths from 'env-paths';
import path from 'path';

import { writeConfig } from './create';
import { fileExists } from './utils';

const CONFIG_FILE_NAME = 'zotera.yaml';
const debug = _debug('zotera:config:locate');

export function locate(config?: string): string {
  if (config) {
    return path.resolve(config);
  }

  const paths = envPaths('zotera', {
    suffix: ''
  });

  const configPath = path.resolve(paths.config, CONFIG_FILE_NAME);

  const existingConfig = fileExists(configPath);

  if (existingConfig) {
    debug('Found config file at %s', configPath);
    return configPath;
  }

  return writeConfig(configPath);
}
