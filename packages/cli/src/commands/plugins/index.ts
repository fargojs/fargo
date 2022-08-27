import { Command } from 'commander';

import { create } from './create';
import { get } from './get';
import { list } from './list';
import { pack } from './pack';

export const plugins = new Command('plugins').description('Manage Zotera Community Plugins');
plugins.addCommand(get);
plugins.addCommand(pack);
plugins.addCommand(list);
plugins.addCommand(create);
