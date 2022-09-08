import { promises as fs } from 'fs';
import JoyCon from 'joycon';
import path from 'path';

interface ZoteraRC {
  registry: string;
}

export async function loadZoteraRC(): Promise<ZoteraRC | undefined> {
  const cwd = process.cwd();
  const joycon = new JoyCon();
  const joyconResult = await joycon.resolve({
    files: ['.zoterarc', 'package.json'],
    cwd,
    stopDir: path.parse(cwd).root,
    packageKey: 'zotera'
  });

  if (joyconResult) {
    let data = JSON.parse(await fs.readFile(joyconResult, 'utf8'));
    if (joyconResult.endsWith('package.json')) {
      data = data.zotera;
    }

    return data;
  }

  return undefined;
}
