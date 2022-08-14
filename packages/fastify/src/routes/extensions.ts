import _debug from 'debug';
import type { FastifyInstance } from 'fastify';

const debug = _debug('zotera:fastify:routes:extensions');

export async function extensions(zotera: FastifyInstance) {
  zotera.get('/', async (_) => {
    debug('all extensions lookup');
    const packages = await zotera.storage.getPackages();
    return [];
  });
}
