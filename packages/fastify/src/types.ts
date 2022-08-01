import type { ZoteraConfig } from '@zotera/types';

export type PluginOptions = Omit<ZoteraConfig, 'logging'>;