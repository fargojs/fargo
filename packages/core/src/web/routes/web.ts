import type { FastifyInstance } from 'fastify';

export async function web(zotera: FastifyInstance) {
  zotera.get('/', async () => {
    return {
      message: 'pong'
    };
  });
}
