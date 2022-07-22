import express from 'express';

import type { ZoteraConfig } from '@zotera/types';

import { ping } from './routes/ping';

type RouterOptions = Omit<ZoteraConfig, 'logging'>;

const zoteraRouter = (options?: RouterOptions) => {
  const router = express.Router();

  ping(router);

  return router;
};

export default zoteraRouter;
