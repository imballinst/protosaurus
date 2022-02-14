import type { Preset } from "@docusaurus/types";

export type ProtosaurusPresetEntry = ["protorosaurus"];

export default function protosaurusPreset(): Preset {
  return {
    themes: [require.resolve("protosaurus-theme")],
  };
}
