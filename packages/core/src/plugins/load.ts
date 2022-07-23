import _debug from 'debug';
import fs from 'fs';
import path from 'path';

import type { ZoteraConfig, ZoteraPluginImpl } from '@zotera/types';

import { unpack } from './unpack';

const debug = _debug('zotera:core:plugins');

export async function loadPlugins({
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
  const dir = path.resolve(configPath, pluginDir);
  debug('Plugin directory %s', dir);
  const k = plugins.map((plugin) => {
    try {
      return loadPlugin(plugin, dir);
    } catch (e) {
      debug('Error loading plugin %s', plugin);
      throw new Error(e);
    }
  });

  return await Promise.all(k);
}

/**
 * Load a zotera plugin from plugins directory
 */
async function loadPlugin(plugin: string, dir: string): Promise<ZoteraPluginImpl | undefined> {
  debug('Loading plugin %s', plugin);
  const pluginPath = path.resolve(dir, plugin);
  try {
    const isUnpacked = await fs.promises.stat(pluginPath);
    // isUnpacked
    if (isUnpacked.isDirectory()) {
      debug('Plugin is unpacked');
      debug('Plugin path %s', pluginPath);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return require(pluginPath) as ZoteraPluginImpl;
    }
  } catch (e) {
    debug('Plugin is not unpacked');
    console.log(`${pluginPath}.zop`)
    await unpack(`${pluginPath}.zop`);
    throw new Error(`Plugin ${plugin} not found`);
    // Plugin is not unpacked
    debug('Plugin %s is not unpacked, unpacking...', plugin);
    debug('Error loading plugin %s', plugin);
  }
}
