import { statSync } from 'fs';

/**
 * Check whether the file already exist.
 * @param {String} path
 * @return {Boolean}
 */
export function fileExists(path: string): boolean {
  try {
    const stat = statSync(path);
    return stat.isFile();
  } catch (err) {
    return false;
  }
}
