import axios from 'axios';
import type { FastifyInstance } from 'fastify';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { createZotera } from '../src';

let zotera: FastifyInstance | undefined;

beforeAll(async () => {
  const app = createZotera();

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
    const { data } = await axios('http://localhost:6969/-/ping');
    expect(data).toBe('Pong!');
  });
});
