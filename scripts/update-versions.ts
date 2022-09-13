import fetch from 'node-fetch';
import { writeFile } from 'node:fs/promises';
import prettier from 'prettier';

import { depVersions } from '../packages/cli/src/dep-versions';
import { version as pkgVersion } from '../packages/types/package.json';
import { BANNER } from './utils/banner';

const baseUrl = 'https://registry.npmjs.org/';

const command = 'pnpm run update:dep-versions';

const deps: Record<string, string> = {};

async function run() {
  console.log('DEPENDENCY VERSION UPDATER');
  await Promise.all(
    Object.keys(depVersions).map(async (dep) => {
      let version = await getVersion(dep);
      if (!version && dep !== '@zotera/types') {
        console.log(`No version found for ${dep}`);
        return;
      }

      if (!version && dep === '@zotera/types') version = pkgVersion;

      deps[dep] = version || '*';
    })
  );

  const content = `${BANNER(
    command
  )}\n\n// This needs to be exported because it's used in update-versions.ts script.\nexport const depVersions: Record<string, string> = ${JSON.stringify(
    deps,
    null,
    2
  )};`;

  prettier.resolveConfig(process.cwd()).then((options) => {
    writeFile('./packages/cli/src/dep-versions.ts', prettier.format(content, options));
  });
}

async function getVersion(packageName: string): Promise<string | undefined> {
  try {
    const url = `${baseUrl}${packageName}/latest`;
    const parsed = (await (await fetch(url)).json()) as { version: string };
    return parsed.version;
  } catch (e) {
    return undefined;
  }
}

run();
