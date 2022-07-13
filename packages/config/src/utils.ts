import { statSync } from 'fs';

/**
 * Check whether the path already exist.
 * @param {String} path
 * @return {Boolean}
 */
export function folderExists(path: string): boolean {
  try {
    const stat = statSync(path);
    return stat.isDirectory();
  } catch (err) {
    return false;
  }
}

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
