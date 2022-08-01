import readline from 'node:readline';
import c from 'picocolors';

import type { ZoteraApp } from '@zotera/server';

export const keys: string[][] = [
  ['h', 'show help message'],
  ['p', 'do something with plugins'],
  ['q', 'quit']
];

export const helpMessage = `
${c.bold('  Zotera Server Usage')}
${keys.map((i) => c.dim('  press ') + c.reset(c.bold(i[0])) + c.dim(` to ${i[1]}`)).join('\n')}
`;

// @ts-expect-error Node.js maps process.stdout to console._stdout
// eslint-disable-next-line no-console
const stdout = console._stdout || process.stdout;

interface KeypressKeyObject {
  sequence: string;
  name?: string;
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
}

export function createInteractive(zotera: ZoteraApp) {
  const keypress = async (str: string, key: KeypressKeyObject) => {
    if (str === '\x03' || str === '\x1B' || (key && key.ctrl && key.name === 'c')) {
      process.exit(0);
    }



    const name = key.name;

    if (name === 'h') {
      return stdout.write(helpMessage);
    }

    if (name === 'p') {
      return zotera.plugins();
    }

    if (name === 'q') {
      return process.exit(0);
    }
  };
  stdout.write(helpMessage);
  const rlInterface = readline.createInterface({ input: process.stdin, escapeCodeTimeout: 50 });
  readline.emitKeypressEvents(process.stdin, rlInterface);
  if (process.stdin.isTTY) process.stdin.setRawMode(true);
  process.stdin.on('keypress', keypress);
}
