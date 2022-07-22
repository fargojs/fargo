import _debug from 'debug';

import type { ZoteraConfig } from '@zotera/types';

const debug = _debug('zotera:core:plugins');

export function loadPlugins({
  allowUnscopedPlugins = false,
  pluginDir = './plugins',
  plugins: plugs = []
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

  plugins.map((plugin) => loadPlugin(plugin, pluginDir));
}

function loadPlugin(plugin: string, dir: string) {
  debug.extend('load')('Loading plugin %s', plugin);
}

// function loadFromDirectory() {}

// function loadFromRegistry() {}
