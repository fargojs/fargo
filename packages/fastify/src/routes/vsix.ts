import _debug from 'debug';
import type { FastifyInstance } from 'fastify';

// import { MimeTypes } from '@zotera/core';

const debug = _debug('zotera:fastify:routes:vsix');

export async function vsix(zotera: FastifyInstance) {
  zotera.get('/', async (req, res) => {
    const { identifier } = req.params as { identifier: string };

    debug('identifier lookup: %s', identifier);

    const manifest = await zotera.storage.getPackage(identifier);
    // res.type(MimeTypes.VSIX).send(file);
    return 'vsix indentifier';
  });

  zotera.get('/:version', async (req) => {
    const { identifier, version } = req.params as { identifier: string; version: string };

    debug('identifier lookup %s with version %s', identifier, version);
    // const manifest = await zotera.storage.getPackageByVersion(identifier, version);
    return 'vsix identifier version';
  });

  zotera.get('/versions', async (req) => {
    const { identifier } = req.params as { identifier: string };

    debug('identifier lookup: %s', identifier);
    // const versions = await zotera.storage.getPackageVersions(identifier);
    return 'vsix identifier versions';
  });
}
