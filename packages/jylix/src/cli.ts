#!/usr/bin/env node
import { cac } from "cac";

import type { InitFlags, RunFlags } from "./@types/jylix";

declare global {
  const __VERSION__: string;
}

const cli = cac("jylix");

cli.option("-c, --config <path>", "[string] path to config file");

cli
  .command("init", "create a new jylix config file")
  .option("-d, --dir <path>", "[string] directory to create config in", {
    default: "."
  })
  .action(async (options: InitFlags) => {
    throw new Error("Currently not implemented");
  });


cli
  .command("[root]", "run typeschema")
  .alias("run")
  .action(async (_, options: RunFlags) => {

  });

cli.help();
cli.version(__VERSION__);

cli.parse();
