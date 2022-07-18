import { describe, expect, it } from 'vitest';

import { parseConfiguration } from '../src';

describe('parse', () => {
  it('parse configuration', () => {
    const config = parseConfiguration('./test/shared/config.yaml');

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
