// import Ajv from 'ajv';
import _debug from 'debug';
import fs from 'fs';
import path from 'path';

import type { ZoteraConfig, ZoteraPluginImpl } from '@zotera/types';

import { context } from './context';

const debug = _debug('zotera:core:plugins');

// const ajv = new Ajv();

interface PluginLoadOptions {
  name: string;
  options?: any;
}

export function loadPlugins({
  allowUnscopedPlugins = false,
  pluginDir = './plugins',
  plugins: plugs = [],
  configPath
}: ZoteraConfig) {
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

  debug('Loading %d plugin(s)', plugins.length);
  const dir = path.resolve(configPath, pluginDir);

  plugins.forEach((plugin) => {
    try {
      const pluginImpl = loadPlugin(plugin.name, dir, plugin.options);
      if (!pluginImpl) {
        debug('Plugin %s is not loaded correctly', plugin.name);
        return;
      }

      // Freezing because of context can be overriden
      pluginImpl.register(context, plugin.options);
    } catch (e) {
      // TODO: @luxass 24-07-22: this error should be logged with something else.
      debug('Error loading plugin %O', plugin);
    }
  });
}

function loadPlugin(
  plugin: string,
  dir: string,
  options: any
): ZoteraPluginImpl | undefined {
  debug('Loading plugin %s', plugin);
  const pluginPath = path.resolve(dir, plugin);

  try {
    const isUnpacked = fs.statSync(pluginPath);
    if (isUnpacked.isDirectory()) {
      debug('Plugin path %s', pluginPath);

      // TODO: 25-07-22: @luxass should be using a validation here for plugin options and the options given.

      // TODO: 24-27-22: Convert as to a type.

      // Getting zotera options from package.json
      // const { zotera } = require(path.resolve(pluginPath, 'package.json')) as {
      //   zotera: {
      //     options?: any;
      //   };
      // };

      // debug('Plugin options %O', zotera);
      debug('given options %O', options);

      const pluginOptions = options;
      return {
        ...require(pluginPath),
        pluginOptions
      } as ZoteraPluginImpl;
    }
    debug('Plugin is neither packed, nor unpacked. it is probably a file.');
  } catch (e) {
    debug('Plugin %s is not unpacked, skipping', plugin);
  }
}
