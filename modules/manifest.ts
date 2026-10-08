import { cascadeEngine } from "./cascade-engine";
import { nexaPortalCore } from "./nexa-portal-core";
import { staticResonanceSync } from "./static-resonance-sync";
import { terminal } from "./terminal";
import type { ModuleDefinition } from "./types";

// Central module registry. To add a module: create its folder and list it here.
export const MODULES: ModuleDefinition[] = [
  terminal,
  cascadeEngine,
  nexaPortalCore,
  staticResonanceSync,
];
