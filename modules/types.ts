import type { ComponentType } from "react";

export type ModuleStatus = "online" | "beta" | "locked";

export type ModuleMeta = {
  id: string;
  name: string;
  description: string;
  status: ModuleStatus;
};

export type ModuleProps = {
  modules: ModuleMeta[];
};

export type ModuleDefinition = ModuleMeta & {
  component?: ComponentType<ModuleProps>;
};
