import path from 'path';

import { ZoteraConfig } from '@zotera/types';

import { locate } from './locate';
import { parseJSON } from './parse';

export async function readConfiguration(config?: string): Promise<ZoteraConfig> {
  const location = await locate(config);
  const fileType = path.extname(location);

  // TODO: Add multiple files types
  // e.g json, json5, jsonc
  if (fileType !== '.json') {
    throw new Error(`Invalid configuration file type: ${fileType}`);
  }

  const configuration = await parseJSON(location);
  configuration.__location = path.dirname(location);
  return configuration;
}
