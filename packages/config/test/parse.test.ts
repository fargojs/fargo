import { describe, expect, it } from 'vitest';

import { parseJSON } from '../src';

describe('parse', () => {
  it('parse JSON', async () => {
    const config = await parseJSON('./test/shared/file1.json');

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

  it('parse JSONC', async () => {
    const config = await parseJSON('./test/shared/file2.jsonc');

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
