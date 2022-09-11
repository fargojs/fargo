import _debug from 'debug';
import envPaths from 'env-paths';
import { statSync } from 'fs';
import path from 'path';

import { writeConfig } from './create';

const CONFIG_FILE_NAME = 'zotera.json';
const debug = _debug('zotera:config:locate');

function fileExists(path: string): boolean {
  try {
    const stat = statSync(path);
    return stat.isFile();
  } catch (err) {
    return false;
  }
}

export async function locate(config?: string): Promise<string> {
  if (config) {
    return path.resolve(config);
  }

  const paths = envPaths('zotera', {
    suffix: ''
  });

  // TODO: Allow multiple config file names.
  // e.g. zotera.json, zotera.jsonc, zotera.json5
  const configPath = path.resolve(paths.config, CONFIG_FILE_NAME);

  const existingConfig = fileExists(configPath);

  if (existingConfig) {
    debug('Found config file at %s', configPath);
    return configPath;
  }

  return await writeConfig(configPath);
}
