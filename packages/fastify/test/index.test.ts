/* eslint-disable no-console */
import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import zotera from '../src';

let server: FastifyInstance | undefined;

beforeAll(async () => {
  const app = Fastify();

  // Add zotera to the express app
  app.register(zotera, {
    plugins: ['@zotera/plugin-auth']
  });

  server = app;

  await app.listen({
    port: 3500
  });

  app.get('/', (_, res) => {
    res.send({
      message: 'Hello World'
    });
  });
});

afterAll(() => {
  if (server) {
    server.close(() => console.log('Fastify stopped listening on port 3500'));
  }
});

describe('Fastify  Router', () => {
  it('should return hello, world!', async () => {
    const response = await (await fetch('http://localhost:3500/')).json();
    expect(JSON.parse(response.body)).toStrictEqual({
      message: 'Hello World'
    });
  });

  it('', async () => {
    const data = await (await fetch('http://localhost:3500/')).json();
    console.log(data);
  });
});
