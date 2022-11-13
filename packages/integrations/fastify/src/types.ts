import type { OmitSafe, ZoteraConfig } from '@zotera/types';

export type PluginOptions = OmitSafe<ZoteraConfig, 'logging' | 'pluginDir' | '__location'>;
