import _debug from 'debug';
import type { FastifyInstance } from 'fastify';

const debug = _debug('zotera:fastify:routes:extensions');

export async function extensions(zotera: FastifyInstance) {
  zotera.get('/', async (req) => {
    debug('all extensions lookup');

    return [];
  });
}
