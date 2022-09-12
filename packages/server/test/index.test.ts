import type { FastifyInstance } from 'fastify';
import fetch from 'node-fetch';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { createZotera } from '../src';

let zotera: FastifyInstance | undefined;

beforeAll(async () => {
  const app = await createZotera();

  zotera = app;

  await zotera.listen({
    host: 'localhost',
    port: 6969
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
    const data = await (await fetch('http://localhost:6969/-/ping')).json();
    expect(data).toBe('Pong!');
  });
});
