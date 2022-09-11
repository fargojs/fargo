import _debug from 'debug';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'path';

import defaultConfig from './configs/default-config.json';

const debug = _debug('zotera:config');

/**
 * Creates a configuration file, if it does not exist.
 * @param {string} loc Location of the config file
 * @returns {string} Path to the config file
 */
export async function writeConfig(loc: string): Promise<string> {
  await mkdir(dirname(loc), { recursive: true });
  debug('Creating config folder at %s', loc);
  const defaultConfiguration = defaultConfig;
  await writeFile(loc, JSON.stringify(defaultConfiguration, null, 2));

  return loc;
}
