import { Command } from 'commander';

import { config } from '../../config';

export const login = new Command('login').action(() => {
  config.set('foo', 'bar');
  console.log(config.get('foo'));

  console.log('This is not implemented yet.');
});
