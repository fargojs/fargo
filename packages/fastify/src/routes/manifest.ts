import _debug from 'debug';
import type { FastifyInstance } from 'fastify';

const debug = _debug('zotera:fastify:routes:manifest');

export async function manifest(zotera: FastifyInstance) {
  zotera.get('/', async (req) => {
    const { identifier } = req.params as { identifier: string };

    debug('identifier lookup: %s', identifier);

    // const manifest = await zotera.storage.getPackage(identifier);
    return 'manifest';
  });

  zotera.get('/:version', async (req) => {
    const { identifier, version } = req.params as { identifier: string; version: string };

    debug('identifier lookup %s with version %s', identifier, version);
    // const manifest = await zotera.storage.getPackageByVersion(identifier, version);
    return 'manifest';
  });

  zotera.get('/versions', async (req) => {
    const { identifier } = req.params as { identifier: string };

    debug('identifier lookup: %s', identifier);
    // const versions = await zotera.storage.getPackageVersions(identifier);
    return 'versions';
  });

}
