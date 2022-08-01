import got from 'got';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { createZotera } from '../src';
import type { ZoteraApp } from '../src';

let zotera: ZoteraApp | undefined;

beforeAll(async () => {
  const app = createZotera({
    host: 'localhost',
    port: 6969,
    config: {},
    interactive: false
  });

  zotera = app;

  await zotera.listen();
});

afterAll(() => {
  if (zotera) {
    zotera.close();
    console.log('Zotera Server stopped listening on port 6969');
  }
});

describe('Fastify  Router', () => {
  it('should return hello, world!', async () => {
    expect(true).toBe(true);
  });
});
