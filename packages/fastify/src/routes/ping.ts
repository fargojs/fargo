import type { FastifyInstance } from 'fastify';

export async function ping(zotera: FastifyInstance) {
  zotera.get('/', async () => {
    return 'Pong!';
  });
}
