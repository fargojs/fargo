import { Command } from 'commander';

import { create } from './create';
import { install } from './install';
import { list } from './list';
import { pack } from './pack';

export const plugins = new Command('plugins').description('Manage Zotera Community Plugins');
plugins.addCommand(install);
plugins.addCommand(pack);
plugins.addCommand(list);
plugins.addCommand(create);
