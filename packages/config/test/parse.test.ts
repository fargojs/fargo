import { describe, expect, it } from 'vitest';

import { parseJSON, parseYAML } from '../src';

describe('parse', () => {
  it('parse YAML', () => {
    const config = parseYAML('./test/shared/config.yaml');

    expect(config).toStrictEqual({
      this: {
        is: {
          a: 'test'
        }
      },
      and: 10
    });
    expect(config).toBeTypeOf('object');
  });

  it('parse JSON', () => {
    const config = parseJSON('./test/shared/config.json');

    expect(config).toStrictEqual({
      this: {
        is: {
          a: 'test'
        }
      },
      and: 10
    });
    expect(config).toBeTypeOf('object');
  });

  it('parse JSONC', () => {
    const config = parseJSON('./test/shared/config.jsonc');

    expect(config).toStrictEqual({
      this: {
        is: {
          a: 'test'
        }
      },
      and: 10
    });
    expect(config).toBeTypeOf('object');
  });
});
