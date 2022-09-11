import _debug from 'debug';
import envPaths from 'env-paths';
import { statSync } from 'node:fs';
import path from 'node:path';

import { writeConfig } from './write';

const debug = _debug('zotera:config:locate');
export const fileExtensions = ['.json', '.json5', '.jsonc'];
function findConfigurationFile(dir: string): string {
  for (const ext of fileExtensions) {
    const configPath = path.join(dir, `zotera${ext}`);
    if (fileExists(configPath)) {
      return configPath;
    }
  }
}

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

  const configPath = findConfigurationFile(paths.config);

  if (configPath) {
    debug('Found config file at %s', configPath);
    return configPath;
  }

  return await writeConfig(configPath);
}
