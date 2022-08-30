import path from 'path';

import { ZoteraConfig } from '@zotera/types';

import { locate } from './locate';
import { parseJSON, parseYAML } from './parse';

export function readConfiguration(config?: string): ZoteraConfig {
  let configuration: ZoteraConfig;

  const location = locate(config);
  const fileType = path.extname(location);

  if (fileType !== '.yaml' && fileType !== '.json') {
    throw new Error(`Invalid configuration file type: ${fileType}`);
  }

  if (fileType === '.yaml') {
    configuration = parseYAML(location);
  } else {
    configuration = parseJSON(location);
  }
  configuration.__location = path.dirname(location);
  return configuration;
}
