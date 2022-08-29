import { join, resolve } from 'path';
import type { GeneratorOptions } from 'yeoman-generator';

import { ZoteraGenerator } from './base';

export default class AuthPluginGenerator extends ZoteraGenerator {
  options: {
    name: string;
    esbuild: boolean;
    git: boolean;
    vitest: boolean;
    description: string;
  };

  constructor(args: string | string[], opts: GeneratorOptions) {
    super(args, opts);

    this.options = {
      name: opts.name,
      esbuild: opts.esbuild,
      git: opts.git,
      description: opts.description,
      vitest: opts.vitest
    };
  }

  writing() {
    this.destinationRoot(resolve(this.options.name));
    this.sourceRoot(join(this.dirname, '../templates/auth'));

    this.fs.copyTpl(this.templatePath('../shared/_package.json'), this.destinationPath('package.json'), {
      name: this.options.name,
      description: this.options.description,
      vitest: this.options.vitest,
      esbuild: this.options.esbuild,
      dep: this.getDependencyVersion
    });

    this.fs.copy(
      this.templatePath('../shared/tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );

    this.fs.copyTpl(this.templatePath('src/plugin.ts'), this.destinationPath('src/plugin.ts'));

    if (this.options.git) {
      this.fs.copy(this.templatePath('../shared/_gitignore'), this.destinationPath('.gitignore'));
    }

    if (this.options.vitest) {
      this.fs.copy(
        this.templatePath('../shared/vitest.config.ts'),
        this.destinationPath('vitest.config.ts')
      );
      this.fs.copy(this.templatePath('test'), this.destinationPath('test'));
    }

    this.fs.copyTpl(this.templatePath('../shared/README.md'), this.destinationPath('README.md'), {
      name: this.options.name
    });
  }

  end() {
    if (this.options.git) {
      this.spawnCommand('git', ['init', '--quiet']);
    }
  }
}
