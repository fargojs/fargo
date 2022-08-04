import Ajv from 'ajv';
import _debug from 'debug';
import fs from 'fs';
import path from 'path';

import type { ZoteraConfig, ZoteraPlugin } from '@zotera/types';

import { context } from './context';

const debug = _debug('zotera:core:plugin:loader');

interface PluginLoadOptions {
  name: string;
  options?: any;
}

const ajv = new Ajv({
  useDefaults: true
});

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

  for (const _plugin of plugins) {
    try {
      const plugin = loadPlugin(_plugin.name, dir, _plugin.options);
      console.log(plugin?.options);

      if (plugin) {
        const _context = {
          ...context,
          options: plugin.options
        };
        plugin.register(_context);
      }
    } catch (e) {
      debug('Plugin %s is not loaded', _plugin.name);
    }
  }
}

function loadPlugin(plugin: string, dir: string, pluginOptions: any): ZoteraPlugin | undefined {
  debug('Loading plugin %s', plugin);
  const pluginPath = path.resolve(dir, plugin);

  try {
    const isUnpacked = fs.statSync(pluginPath);
    if (isUnpacked.isDirectory()) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { register, options } = require(pluginPath);

      const validate = ajv.compile({
        ...options,
        type: 'object'
      });



      if (!validate(pluginOptions)) {
        console.log(validate.errors);
      }

      return {
        register,
        options
      } as ZoteraPlugin;
    }
    debug('Plugin is neither packed, nor unpacked. it is probably a file.');
  } catch (e) {
    debug('Plugin %s is not unpacked, skipping', plugin);
  }
}
