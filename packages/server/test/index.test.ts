import got from 'got';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { createZotera } from '../src';
import type { ZoteraApp } from '../src';

let zotera: ZoteraApp | undefined;

beforeAll(async () => {
  const app = createZotera();

  zotera = app;

  await zotera.listen({
    host: 'localhost',
    port: 6969,
  });
});

afterAll(() => {
  if (zotera) {
    zotera.close();
    console.log('Zotera Server stopped listening on port 6969');
  }
});

describe('Zotera Server', () => {
  it('should be listening on port 6969', async () => {
    const response = await got('http://localhost:6969/-/ping');
    expect(response.body).toBe('Pong!');
  });


});
