import _debug from 'debug';
import path from 'path';

import type { ZoteraConfig } from '@zotera/types';

const debug = _debug('zotera:core:plugins');

export function loadPlugins({
  allowUnscopedPlugins = false,
  pluginDir = './plugins',
  plugins: plugs = [],
  configPath
}: ZoteraConfig) {
  const plugins = plugs
    .map((plugin) => {
      if (typeof plugin === 'object') {
        return Object.keys(plugin)[0];
      } else {
        return plugin;
      }
    })
    .filter((plugin) => {
      return allowUnscopedPlugins || plugin.startsWith('@');
    });

  debug('Loading %s plugins', plugins.length);

  plugins.map((plugin) => loadPlugin(plugin, path.resolve(configPath, pluginDir)));
}

/**
 * Load a zotera plugin from plugins directory
 */
async function loadPlugin(plugin: string, dir: string) {
  debug('Loading plugin %s', plugin);
  const pluginLocation = path.resolve(dir, plugin + '.zop');
  debug('Plugin location %s', pluginLocation);
}

// function loadFromDirectory() {}
