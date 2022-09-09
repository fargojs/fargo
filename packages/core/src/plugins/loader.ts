import Ajv from 'ajv';
import _debug from 'debug';
import fs from 'fs';
import path from 'path';

import { ZoteraConfig, ZoteraPlugin } from '@zotera/types';

import { readManifest } from './bundle';
import { buildContext } from './context';

const debug = _debug('zotera:core:plugin:loader');

interface PluginLoadOptions {
  name: string;
  options?: any;
}

const ajv = new Ajv({
  useDefaults: true
});

// TODO: Rewrite this, it's a mess.
export async function loadPlugins(options: ZoteraConfig) {
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

  for (const _plugin of plugins) {
    try {
      debug('Loading plugin %s', _plugin.name);
      const pluginPath = path.resolve(dir, _plugin.name);
      const pluginFolder = fs.statSync(pluginPath);
      if (pluginFolder.isDirectory()) {
        const { main, module } = await readManifest(pluginPath);

        const pluginMain = main || module || 'dist/plugin.js';

        const { register, options } = await import(path.join(pluginPath, pluginMain)).catch(
          (err) => {
            debug('Error loading plugin: %s', err);
          }
        );
        const validate = ajv.compile({
          properties: options,
          type: 'object'
        });

        if (!validate(_plugin.options)) {
          debug('Plugin %s options are invalid', _plugin.name);
          continue;
        }

        const plugin = {
          register,
          options
        } as ZoteraPlugin;

        plugin.register(buildContext(options, plugin.options));
        debug('Plugin %s loaded', _plugin.name);
      }
    } catch (e) {
      debug('Plugin %s is not loaded', _plugin.name);
    }
  }
}
