import _debug from 'debug';
import type { FastifyInstance } from 'fastify';

const debug = _debug('zotera:fastify:routes:extensions');

export async function extensions(zotera: FastifyInstance) {
  // TODO: This is a temporary solution for uploading
  zotera.post('/', async (_) => {
    debug('Uploading extension');
    return {
      status: 'ok'
    };
  });

  zotera.get(
    '/',
    {
      // onRequest: (request, reply, done) => {
      //   debug('GET / 222');
      //   done();
      // }
    },
    async (_) => {
      debug('all extensions lookup');
      const packages = await zotera.storage.getPackages();
      return [];
    }
  );
}
