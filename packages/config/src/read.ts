import path from 'node:path';

import { ZoteraConfig } from '@zotera/types';

import { fileExtensions, locate } from './locate';
import { parseJSON } from './parse';

export async function readConfiguration(config?: string): Promise<ZoteraConfig> {
  const location = await locate(config);
  const fileType = path.extname(location);

  if (!fileExtensions.includes(fileType)) {
    throw new Error(`Invalid configuration file type: ${fileType}`);
  }

  const configuration = await parseJSON(location);
  configuration.__location = path.dirname(location);
  return configuration;
}
