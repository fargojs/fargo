import axios from 'axios';
import { promises as fs } from 'fs';

import { depVersions } from '../packages/cli/src/dep-versions';
import { version as pkgVersion } from '../packages/types/package.json';

const baseUrl = 'https://registry.npmjs.org/';

const command = 'pnpm run update:dep-versions';

const BANNER = `/*
* This file is automatically generated.
* Run '${command}' to update.
*/`;

const deps: Record<string, string> = {};

async function run() {
  console.log('DEPENDENCY VERSION UPDATER');
  await Promise.all(
    Object.keys(depVersions).map(async (dep) => {
      let version = await getVersion(dep);
      if (!version && dep !== '@zotera/types') {
        console.log('No version found');
        return;
      }

      if (!version && dep === '@zotera/types') version = pkgVersion;

      deps[dep] = version || '*';
    })
  );

  const content = `${BANNER}\n\n// This needs to be exported because it's used in update-versions.ts script.\nexport const depVersions: Record<string, string> = ${JSON.stringify(
    deps,
    null,
    2
  )};`;

  fs.writeFile('./packages/cli/src/dep-versions.ts', content);
}

async function getVersion(packageName: string): Promise<string | undefined> {
  try {
    const url = `${baseUrl}${packageName}/latest`;
    const parsed: { version: string } = await (await axios(url)).data;
    return parsed.version;
  } catch (e) {
    return undefined;
  }
}

run();
