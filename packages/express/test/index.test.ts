import express from 'express';
import got from 'got';
import type { Server } from 'http';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import zotera from '../src';

let server: Server | undefined;

beforeAll(() => {
  const app = express();

  // Add zotera to the express app
  app.use(zotera());
  // eslint-disable-next-line no-console
  server = app.listen(3400, () => console.log('Express started listening on port 3400'));
  app.get('/', (_, res) => {
    res.json({
      message: 'Hello World'
    });
  });
});

afterAll(() => {
  if (server) {
    // eslint-disable-next-line no-console
    server.close(() => console.log('Express stopped listening on port 3400'));
  }
});

describe('Express Router', () => {
  it('should return hello, world!', async () => {
    const response = await got('http://localhost:3400/');
    expect(JSON.parse(response.body)).toStrictEqual({
      message: 'Hello World'
    });
  });

  it('', async () => {
    const { body } = await got.get('http://localhost:3400/');
    console.log(body);
  });
});
