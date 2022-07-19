import { join, resolve } from 'path';
import Generator from 'yeoman-generator';
import type { GeneratorOptions } from 'yeoman-generator';

export default class PluginGenerator extends Generator {
  constructor(args: string | string[], opts: GeneratorOptions) {
    super(args, opts);

    this.options = {
      name: opts.name,
      rollup: opts.rollup
    };
  }



  writing() {
    this.destinationRoot(resolve(this.options.name));
    this.sourceRoot(join(__dirname, './templates/typescript'));

    this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), {
      name: this.options.name,
      description: this.options.rollup
    });

    this.fs.copyTpl(this.templatePath('src/index.ts.ejs'), this.destinationPath('src/index.ts'));

    if (this.options.rollup) {
      this.fs.copyTpl(this.templatePath('src/index.ts.ejs'), this.destinationPath('src/index.te.ts'));
    }
  }

  install() {
    process.chdir(this.options.name);
    // this.installDependencies({ npm: true, bower: false });
  }
}
