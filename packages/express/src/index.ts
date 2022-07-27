import express from 'express';

import type { ZoteraConfig } from '@zotera/types';

import { manifest } from './routes/manifest';
import { readme } from './routes/readme';
import { vsix } from './routes/vsix';

type RouterOptions = Omit<ZoteraConfig, 'logging'>;

const zoteraRouter = (options?: RouterOptions) => {
  const router = express.Router();

  vsix(router);
  manifest(router);
  readme(router);
  

  return router;
};

export default zoteraRouter;
