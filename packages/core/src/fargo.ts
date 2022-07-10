import type { FargoConfig } from "@fargo/types";
import express, { type Express } from "express";

export async function fargo(config: FargoConfig): Promise<Express> {
  const app = express();

  return app;
}
