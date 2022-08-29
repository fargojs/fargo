import { Command } from 'commander';

export const whoami = new Command('whoami').action(() => {
  console.log('This is not implemented yet.');
  console.log(whoami.parent?.opts());
  
});
