import type { FastifyInstance } from 'fastify';

export async function ping(zotera: FastifyInstance) {
  zotera.get('/-/ping', async () => {
    return {
      message: 'pong'
    };
  });
}
