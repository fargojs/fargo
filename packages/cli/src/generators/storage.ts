import { NeomanGenerator, copy, destinationPath, templatePath } from 'neoman';
import { join, resolve } from 'path';

export function StoragePluginGenerator(options: any): NeomanGenerator {
  return {
    destinationRoot: '',
    sourceRoot: '',
    writing() {
      copy(templatePath('_package.json'), destinationPath('package.json'), {
        name: options.name,
        description: options.description,
        vitest: options.vitest,
        rollup: options.rollup,
        dep: options.getDependencyVersion
      });

      copy(templatePath('../shared/tsconfig.json'), destinationPath('tsconfig.json'));

      copy(templatePath('src/plugin.ts'), destinationPath('src/plugin.ts'));
      if (options.rollup) {
        copy(templatePath('../shared/rollup.config.ts'), destinationPath('rollup.config.ts'));
      }

      if (options.git) {
        copy(templatePath('../shared/gitignore'), destinationPath('.gitignore'));
      }

      if (options.vitest) {
        copy(templatePath('../shared/vitest.config.ts'), destinationPath('vitest.config.ts'));
        copy(templatePath('test'), destinationPath('test'));
      }

      copy(templatePath('../shared/README.md'), destinationPath('README.md'), {
        name: options.name
      });
    }
  };
}

// import { join, resolve } from 'path';
// import type { GeneratorOptions } from 'yeoman-generator';

// import { ZoteraGenerator } from './base';

// export default class StoragePluginGenerator extends ZoteraGenerator {
//   options: {
//     name: string;
//     rollup: boolean;
//     git: boolean;
//     vitest: boolean;
//     description: string;
//   };

//   constructor(args: string | string[], opts: GeneratorOptions) {
//     super(args, opts);

//     this.options = {
//       name: opts.name,
//       rollup: opts.rollup,
//       git: opts.git,
//       description: opts.description,
//       vitest: opts.vitest
//     };
//   }

//   writing() {
//     this.destinationRoot(resolve(this.options.name));
//     this.sourceRoot(join(__dirname, '../templates/storage'));

//     this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), {
//       name: this.options.name,
//       description: this.options.description,
//       vitest: this.options.vitest,
//       rollup: this.options.rollup,
//       dep: this.getDependencyVersion
//     });

//     this.fs.copy(
//       this.templatePath('../shared/tsconfig.json'),
//       this.destinationPath('tsconfig.json')
//     );

//     this.fs.copyTpl(this.templatePath('src/plugin.ts'), this.destinationPath('src/plugin.ts'));

//     if (this.options.rollup) {
//       this.fs.copyTpl(
//         this.templatePath('../shared/rollup.config.ts'),
//         this.destinationPath('rollup.config.ts')
//       );
//     }

//     if (this.options.git) {
//       this.fs.copy(this.templatePath('../shared/gitignore'), this.destinationPath('.gitignore'));
//     }

//     if (this.options.vitest) {
//       this.fs.copy(
//         this.templatePath('../shared/vitest.config.ts'),
//         this.destinationPath('vitest.config.ts')
//       );
//       this.fs.copy(this.templatePath('test'), this.destinationPath('test'));
//     }

//     this.fs.copyTpl(this.templatePath('../shared/README.md'), this.destinationPath('README.md'), {
//       name: this.options.name
//     });
//   }

//   end() {
//     if (this.options.git) {
//       this.spawnCommand('git', ['init', '--quiet']);
//     }
//   }
// }
