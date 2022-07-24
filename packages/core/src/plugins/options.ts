import Ajv from 'ajv';
import js from './plugin-manifest.json';
const ajv = new Ajv();

export function parseOptions(t: any) {
  return ajv.compile(js);
}
