import type { FastifyPluginCallback } from 'fastify';
import flugin from 'fastify-plugin';

const plugin: FastifyPluginCallback = flugin((fastify, opts) => {}, {
  name: 'my-plugin',
  fastify: '3.x'
});

export default plugin;
