import _debug from 'debug';
import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';

import zoteraPlugin from '@zotera/fastify';
import type { ZoteraConfig } from '@zotera/types';

const debug = _debug('zotera:server');

export class ZoteraApp {
  public fastify: FastifyInstance;
  public config: ZoteraConfig;

  constructor(configuration: ZoteraConfig) {
    this.config = configuration;
    this.fastify = Fastify({});
    debug('Loaded configuration %O', configuration);

    this.fastify.register(zoteraPlugin, configuration);
  }

  async listen({ port, host }: { port: number; host: string }) {
    if (!this.fastify.server.listening) {
      await this.fastify.listen({
        port,
        host
      });
    }
  }

  async close() {
    if (this.fastify.server.listening) {
      await this.fastify.close();
    }
  }

  async plugins() {
    console.log('  Plugins');
  }
}
