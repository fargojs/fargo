export type RunFlags = {
  watch: boolean;
  config?: string;
}


export type InitFlags = {
  dir: string;
}

export type JylixConfig = {
  plugins?: JylixConfig[];
}

export type HookParameters<
  Hook extends keyof PluginHooks,
  Fn = PluginHooks[Hook]
> = Fn extends (...args: any) => any ? Parameters<Fn>[0] : never;

export type JylixPlugin = {
  name: string;
  hooks: PluginHooks;
}

export type TypeSchemaContext = {
  config: JylixConfig;
  hooks: PluginHook;
}

export type PluginHooks = {

}

export type PluginHook = {
  call: <Hook extends keyof PluginHooks>(
    hook: Hook,
    params: HookParameters<Hook>
  ) => Promise<void>;
}
