import _debug from 'debug';
import { readFileSync } from 'fs';
import YAML from 'js-yaml';
import path from 'path';

import type { ZoteraConfig } from '@zotera/types';

const debug = _debug('zotera:config');

/**
 * Parse a configuration file
 * @param {string} config path to config file or config object
 * @returns {ZoteraConfig} configuration object
 */
export function parseConfiguration(config: string): ZoteraConfig {
  const yaml = YAML.load(readFileSync(config, 'utf8')) as ZoteraConfig;
  debug('Parsed configuration file %O', yaml);
  return {
    ...yaml,
    configPath: path.dirname(config)
  };
}
