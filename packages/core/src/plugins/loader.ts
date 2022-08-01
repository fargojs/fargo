import _debug from 'debug';
import path from 'path';

import type { ZoteraConfig } from '@zotera/types';

const debug = _debug('zotera:core:plugin:loader');

interface PluginLoadOptions {
  name: string;
  options?: any;
}

export function loadPlugins(options: ZoteraConfig) {
  const {
    allowUnscopedPlugins,
    pluginDir = './plugins',
    plugins: _plugins = [],
    __location
  } = options;

  // Get correct plugin `names & options` and filtering out based on `allowUnscopedPlugins`
  const plugins: PluginLoadOptions[] = _plugins
    .map((plugin) => {
      if (typeof plugin === 'object') {
        const name = Object.keys(plugin)[0];
        return {
          name,
          options: plugin[name]
        };
      } else {
        return { name: plugin };
      }
    })
    .filter((plugin) => {
      return allowUnscopedPlugins || plugin.name.startsWith('@');
    });

  debug('Found %d plugin(s)', plugins.length);
  const dir = path.resolve(__location, pluginDir);

  debug('Loading plugins from ', dir);
}
