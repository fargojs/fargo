import { join, resolve } from 'path';

import { NeomanGenerator } from '@luxass/neoman';

export default function RoutingPluginGenerator(ctx: {
  dirname: string;
  name: string;
  esbuild: boolean;
  git: boolean;
  vitest: boolean;
  description: string;
  framework: string;
  dep: (dep: string) => string;
}): NeomanGenerator {
  return {
    destinationRoot: resolve(ctx.name),
    sourceRoot: join(ctx.dirname, 'templates/routing'),
    writing({ copy, templatePath, destinationPath, spawn }) {
      copy(templatePath('../shared/_package.json'), destinationPath('package.json'), ctx);

      copy(templatePath('../shared/tsconfig.json'), destinationPath('tsconfig.json'));

      copy(templatePath('src/plugin.ts'), destinationPath('src/plugin.ts'));

      if (ctx.git) {
        copy(templatePath('../shared/_gitignore'), destinationPath('.gitignore'));
      }

      if (ctx.vitest) {
        copy(templatePath('../shared/vitest.config.ts'), destinationPath('vitest.config.ts'));
        copy(templatePath('test'), destinationPath('test'));
      }

      copy(templatePath('../shared/README.md'), destinationPath('README.md'), {
        name: ctx.name
      });

      if (ctx.git) {
        spawn('git', ['init', '--quiet']);
      }
    }
  };
}
