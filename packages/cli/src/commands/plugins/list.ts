import { Command } from 'commander';

export const list = new Command('list').description('List all Community plugins').action(() => {
  console.log('This is not implemented yet.');
});
