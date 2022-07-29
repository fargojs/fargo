import Generator from 'yeoman-generator';
import { depVersions } from '../dep-versions';

export class ZoteraGenerator extends Generator {

  getDependencyVersion(dep: string): string {
    const version = depVersions[dep];
    if (!version) {
      throw new Error(`No version found for ${dep}`);
    }

    return `"${dep}": "${version}"`;
  }

}

