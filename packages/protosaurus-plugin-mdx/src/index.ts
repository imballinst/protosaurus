import type { LoadContext, Plugin } from "@docusaurus/types";

export default async function protosaurusPluginMdx(
  context: LoadContext
): Promise<Plugin> {
  return {
    name: "docusaurus-plugin-protosaurus-mdx",
    async loadContent() {
      // TODO(generate).
    },
  };
}
