import _debug from 'debug';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';

import defaultConfig from './configs/default.yaml';

const debug = _debug('zotera:config');

/**
 * Creates a configuration file, if it does not exist.
 * @param {string} loc Location of the config file
 * @returns {string} Path to the config file
 */
export function writeConfig(loc: string): string {
  mkdirSync(dirname(loc), { recursive: true });
  debug('Creating config folder at %s', loc);
  const defaultConfiguration = defaultConfig;
  debug('%O', defaultConfiguration);
  writeFileSync(loc, defaultConfiguration);

  return loc;
}
