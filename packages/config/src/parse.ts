import _debug from 'debug';
import { readFileSync } from 'fs';
import YAML from 'js-yaml';

import type { ZoteraConfig } from '@zotera/types';

const debug = _debug('zotera:config');

export function parseConfiguration(config: string): ZoteraConfig {
  const yaml = YAML.load(readFileSync(config, 'utf8'));
  debug('Parsed configuration file %O', yaml);
  return {};
}
