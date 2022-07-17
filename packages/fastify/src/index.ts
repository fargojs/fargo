import type { FastifyPluginCallback } from 'fastify';
import flugin from 'fastify-plugin';

import type { ZoteraConfig } from '@zotera/types';

type PluginOptions = Omit<ZoteraConfig, 'logging'>;

const plugin: FastifyPluginCallback<PluginOptions> = flugin(
  (fastify, opts) => {
    console.log('Hello from plugin');
  },
  {
    name: 'zotera',
    fastify: '3.x'
  }
);

export default plugin;
