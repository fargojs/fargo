import { join, resolve } from 'path';
import Generator from 'yeoman-generator';
import type { GeneratorOptions } from 'yeoman-generator';

export default class StoragePluginGenerator extends Generator {
  options: {
    name: string;
    rollup: boolean;
    git: boolean;
    vitest: boolean;
    description: string;
  };

  constructor(args: string | string[], opts: GeneratorOptions) {
    super(args, opts);

    this.options = {
      name: opts.name,
      rollup: opts.rollup,
      git: opts.git,
      description: opts.description,
      vitest: opts.vitest
    };
  }

  writing() {
    this.destinationRoot(resolve(this.options.name));
    this.sourceRoot(join(__dirname, '../templates/storage'));

    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), {
      name: this.options.name,
      description: this.options.description,
      vitest: this.options.vitest,
      rollup: this.options.rollup
    });

    this.fs.copy(this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'));

    this.fs.copyTpl(this.templatePath('src/plugin.ts.ejs'), this.destinationPath('src/plugin.ts'));
    if (this.options.rollup) {
      this.fs.copyTpl(
        this.templatePath('rollup.config.ts'),
        this.destinationPath('rollup.config.ts')
      );
    }

    if (this.options.git) {
      this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    }

    if (this.options.vitest) {
      this.fs.copy(this.templatePath('vitest.config.ts'), this.destinationPath('vitest.config.ts'));
      this.fs.copy(this.templatePath('test'), this.destinationPath('test'));
    }

    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), {
      name: this.options.name
    });
  }

  install() {
    process.chdir(this.options.name);
    // this.installDependencies({ npm: true, bower: false });
  }

  end() {
    if (this.options.git) {
      this.spawnCommand('git', ['init', '--quiet', '--initial-branch=main']);
    }
  }
}
