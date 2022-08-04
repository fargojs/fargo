import _debug from 'debug';

import type { ZoteraPluginsConfig } from '@zotera/types';

const debug = _debug('zotera:core:plugin:manager');


export class PluginManager {
  public constructor(private readonly pluginConfig: ZoteraPluginsConfig) {
    debug('constructor(%o)', pluginConfig);
  }

  async init() {}
}
