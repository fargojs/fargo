/* eslint-disable no-console */
import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import got from 'got';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import type { ZoteraConfig } from '@zotera/types';

import zotera from '../src';

let server: FastifyInstance | undefined;

beforeAll(async () => {
  const app = Fastify();

  // Add zotera to the express app
  app.register(zotera, {} as ZoteraConfig);

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
    const response = await got('http://localhost:3500/');
    expect(JSON.parse(response.body)).toStrictEqual({
      message: 'Hello World'
    });
  });

  it('', async () => {
    const { body } = await got.get('http://localhost:3500/');
    console.log(body);
  });
});
