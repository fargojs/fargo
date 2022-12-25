import express from "express";

import { AuthManager, StorageManager } from "@zotera/core";
import type { ZoteraConfig } from "@zotera/types";

import { ping } from "./routes/ping";
import type { MiddlewareOptions } from "./types";

const zoteraRouter = async (options: MiddlewareOptions) => {
  const router = express.Router();

  const config = options;
  const storageManager = new StorageManager(config.storage!);
  await storageManager.init();
  const authManager = new AuthManager(config as ZoteraConfig);
  await authManager.init();
  ping(router);
  // vsix(router);
  // manifest(router);
  // readme(router);
  return router;
};

export default zoteraRouter;
