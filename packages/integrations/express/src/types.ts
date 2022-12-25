import type { OmitSafe, ZoteraConfig } from "@zotera/types";

export type MiddlewareOptions = OmitSafe<ZoteraConfig, "logging" | "pluginDir" | "__location">;
