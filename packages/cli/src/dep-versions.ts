const depVersions: Record<string, string> = {
  '@zotera/api': '0.0.1',
  rollup: '2.77.0',
  '@rollup/plugin-commonjs': '22.0.1',
  '@rollup/plugin-node-resolve': '13.3.0',
  '@rollup/plugin-typescript': '8.3.3',
  tslib: '2.4.0',
  vitest: '0.18.1',
  typescript: '4.7.4'
};

export function getDependencyVersion(dep: string): string {
  const version = depVersions[dep];
  if (!version) {
    throw new Error(`No version found for ${dep}`);
  }

  return `"${dep}": "${version}"`;
}