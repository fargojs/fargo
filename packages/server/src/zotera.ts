import _debug from 'debug';
import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import readline from 'node:readline';
import c from 'picocolors';

import zoteraPlugin from '@zotera/fastify';
import type { ZoteraConfig } from '@zotera/types';

const debug = _debug('zotera:server');

// import { setup } from './logging';

export async function zotera(config: ZoteraConfig): Promise<FastifyInstance> {
  const zotera = Fastify({
    // logger: setup(config.logging),
    ignoreTrailingSlash: true
  });

  zotera.register(zoteraPlugin, config);

  return zotera;
}

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

export class ZoteraApp {
  public fastify: FastifyInstance;
  public config: ZoteraConfig;
  private rlInterface: readline.Interface | undefined;

  constructor(configuration: ZoteraConfig) {
    this.config = configuration;
    this.fastify = Fastify({});
    debug('Loaded configuration %O', configuration);

    this.fastify.register(zoteraPlugin, configuration);
  }

  async listen({ port, host }: { port: number; host: string }) {
    if (!this.fastify.server.listening) {
      await this.fastify.listen({
        port,
        host
      });
    }
  }

  async close() {
    if (this.fastify.server.listening) {
      await this.fastify.close();
    }
  }

  interactive() {
    this.#interactiveOff();

    stdout.write(helpMessage);

    this.rlInterface = readline.createInterface({ input: process.stdin, escapeCodeTimeout: 50 });
    readline.emitKeypressEvents(process.stdin, this.rlInterface);
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
    process.stdin.on('keypress', this.#keypressHandler);
  }

  #interactiveOff() {
    this.rlInterface?.close();
    this.rlInterface = undefined;
    process.stdin.removeListener('keypress', this.#keypressHandler);
    if (process.stdin.isTTY) process.stdin.setRawMode(false);
  }

  #keypressHandler(str: string, key: any) {
    if (str === '\x03' || str === '\x1B' || (key && key.ctrl && key.name === 'c')) {
      process.exit(0);
    }
    const name = key?.name;

    // help
    if (name === 'h') return stdout.write(helpMessage);

    // plugins
    if (name === 'p') return stdout.write('plugs!\n');

    // quit
    if (name === 'q') return process.exit(0);
  }
}
