import { promises as fs } from 'fs';
import got from 'got';

import { depVersions } from '../packages/cli/src/dep-versions';

const baseUrl = 'https://registry.npmjs.org/';

const BANNER = "// This needs to be exports because it's used in update-versions.ts script.";

const deps: Record<string, string> = {};

async function run() {
  console.log('DEPENDENCY UPDATER');
  await Promise.all(
    Object.keys(depVersions).map(async (dep) => {
      let version = await getVersion(dep);
      if (!version && dep !== '@zotera/types') {
        console.log('No version found');
        return;
      }

      if (!version && dep === '@zotera/types') version = '0.0.1';

      deps[dep] = version || '*';
    })
  );

  fs.writeFile(
    './packages/cli/src/dep-versions.ts',
    `${BANNER}\nexport const depVersions: Record<string, string> = ${JSON.stringify(
      deps,
      null,
      2
    )};`
  );
}

async function getVersion(packageName: string): Promise<string | undefined> {
  try {
    const url = `${baseUrl}${packageName}/latest`;
    const parsed: { version: string } = await got(url).json();
    return parsed.version;
  } catch (e) {
    return undefined;
  }
}

run();
