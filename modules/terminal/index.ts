import type { ModuleDefinition } from "../types";
import { Terminal } from "./Terminal";

export const terminal: ModuleDefinition = {
  id: "terminal",
  name: "Terminal",
  description: "Command line interface to the system.",
  status: "online",
  component: Terminal,
};
