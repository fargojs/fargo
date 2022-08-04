import { readFileSync } from 'fs';
import YAML from 'js-yaml';
import JSON5 from 'json5';

import type { ZoteraConfig } from '@zotera/types';

export function parseYAML(config: string): ZoteraConfig {
  const yaml = YAML.load(readFileSync(config, 'utf8')) as ZoteraConfig;
  return yaml;
}

export function parseJSON(config: string): ZoteraConfig {
  const json = JSON5.parse<ZoteraConfig>(readFileSync(config, 'utf8'));
  return json;
}
