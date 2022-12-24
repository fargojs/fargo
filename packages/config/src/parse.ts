import { readFile } from "node:fs/promises";
import strip from "strip-json-comments";

import type { ZoteraConfig } from "@zotera/types";

export async function parseJSON(path: string): Promise<ZoteraConfig> {
  try {
    // eslint-disable-next-line no-new-func
    return new Function(`return ${strip(await readFile(path, "utf8")).trim()}`)();
  } catch (e) {
    return {} as ZoteraConfig;
  }
}
