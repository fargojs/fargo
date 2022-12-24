import { Command } from "commander";

import { publish as publishExtension } from "@zotera/core";

import { loadZoteraRC } from "../rc";

export const publish = new Command("publish")
  .option("-r, --registry <url>", "Zotera Registry URL")
  .description("Publish an extension to a Zotera Registry")
  .argument("[file]", "vsix file to publish")
  .action(async (file) => {
    const rc = await loadZoteraRC();
    let registry = publish.opts().registry;

    if (!rc && !registry) {
      console.error("No zotera registry url specified");
    }

    if (rc && rc.registry && !registry) {
      registry = rc.registry;
    }

    // TODO: Authentication check
    console.log(registry);
    console.log(file);
    await publishExtension(file, registry as string);
  });
