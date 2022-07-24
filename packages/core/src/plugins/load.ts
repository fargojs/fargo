import Ajv from 'ajv';
import _debug from 'debug';
import fs from 'fs';
import path from 'path';

import type { PluginContext, ZoteraConfig, ZoteraPluginImpl } from '@zotera/types';

import manifestSchema from './plugin-manifest.json';
import { unpack } from './unpack';

const debug = _debug('zotera:core:plugins');

const ajv = new Ajv();

const compiled = ajv.compile(manifestSchema);

type PluginLoadOptions = {
  name: string;
  options?: any;
};

export async function loadPlugins({
  allowUnscopedPlugins = false,
  pluginDir = './plugins',
  plugins: plugs = [],
  configPath
}: ZoteraConfig) {
  // TODO: @luxass 24-07-22: this should be moved to somewhere else
  const context: PluginContext = {
    log: {
      info: (message: string) => console.log(message),
      warn: (message: string) => console.warn(message),
      error: (message: string) => console.error(message),
      debug: (message: string) => console.debug(message)
    },
    auth: {
      register: (plugin) => {}
    },
    storage: {
      register: (plugin) => {}
    }
  };

  debug('context', context);

  // Get correct plugin `names & options` and filtering out based on `allowUnscopedPlugins`
  const plugins: PluginLoadOptions[] = plugs
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

  debug('Loading %s plugins', plugins.length);
  const dir = path.resolve(configPath, pluginDir);

  plugins.forEach(async (plugin) => {
    try {
      const pluginImpl = await loadPlugin2(plugin.name, dir);
      if (!pluginImpl) {
        debug('Plugin %s is not loaded correctly', plugin.name);
        return;
      }
      pluginImpl.register(context, pluginImpl.options);
    } catch (e) {
      // TODO: @luxass 24-07-22: this error should be logged with something else.
      console.error(e);
      debug('Error loading plugin %s', plugin);
    }
    // const test = require(path.resolve(dir, plugin.name, 'package.json'));
    // console.log(test);
  });
}

async function loadPlugin2(plugin: string, dir: string): Promise<ZoteraPluginImpl | undefined> {
  debug('Loading plugin %s', plugin);
  const pluginPath = path.resolve(dir, plugin);

  try {
    const isUnpacked = await fs.promises.stat(pluginPath);
    if (isUnpacked.isDirectory()) {
      debug('Plugin is unpacked');
      debug('Plugin path %s', pluginPath);

      // TODO: 24-27-22: Convert as to a type.
      // Getting zotera options from package.json
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { zotera } = require(path.resolve(pluginPath, 'package.json')) as {
        zotera: {
          options?: any;
        };
      };


      // console.log(JSON.stringify(zotera))
      // console.log('gg')
      // console.log(compiled(JSON.stringify(zotera)));
      console.log(compiled(zotera));
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return {
        ...require(pluginPath),
        options: {
          minion: true
        }
      } as ZoteraPluginImpl;
    }
    debug('Plugin is neither packed, nor unpacked. is it probably a file.');
  } catch (e) {
    console.error(e);
    debug('Plugin is not unpacked');
  }
}

/**
 * Load a zotera plugin from plugins directory
 */
// @ts-expect-error gggg
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
    // TODO: Rewrite this part.
    await unpack(pluginPath);
    // Plugin is not unpacked
    debug('Plugin %s is not unpacked, unpacking...', plugin);
    debug('Error loading plugin %s', plugin);
  }
}
