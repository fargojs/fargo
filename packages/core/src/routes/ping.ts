import type { FastifyInstance } from 'fastify';

export async function ping(fastify: FastifyInstance) {
  fastify.get('/-/ping', async () => {
    return {
      message: 'pong',
    };
  });
}
