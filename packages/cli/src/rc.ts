import JoyCon from "joycon";
import { readFile } from "node:fs/promises";
import path from "node:path";

interface ZoteraRC {
  registry: string
}

export async function loadZoteraRC(): Promise<ZoteraRC | undefined> {
  const cwd = process.cwd();
  const joycon = new JoyCon();
  const joyconResult = await joycon.resolve({
    files: [".zoterarc", "package.json"],
    cwd,
    stopDir: path.parse(cwd).root,
    packageKey: "zotera"
  });

  if (joyconResult) {
    let data = JSON.parse(await readFile(joyconResult, "utf8"));
    if (joyconResult.endsWith("package.json")) {
      data = data.zotera;
    }

    return data;
  }

  return undefined;
}
