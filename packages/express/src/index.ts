import type { NextFunction, Request, RequestHandler, Response } from 'express';

import type { ZoteraConfig } from '@zotera/types';

type PluginOptions = Omit<ZoteraConfig, 'logging'>;

const zoteraMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {};

export default zoteraMiddleware;
