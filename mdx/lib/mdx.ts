import { writeFile } from "fs-extra";
import { PackageData } from "./types";

// Main exported functions.
export async function emitMdx(filePath: string, pkg: PackageData) {
  const services = pkg.servicesData.map((m) => m.body).join("\n\n");
  const messages = pkg.messagesData.map((m) => m.body).join("\n\n");

  const servicesString = services.length ? `## Services\n\n${services}` : "";
  const messagesString = messages.length ? `## Messages\n\n${messages}` : "";

  return writeFile(
    `${filePath}.mdx`,
    `
---
---

import Description from "@theme/Description";
import Definition from "@theme/Definition";
import DefinitionHeader from "@theme/DefinitionHeader";
import RpcDefinition from "@theme/RpcDefinition";
import RpcDefinitionHeader from "@theme/RpcDefinitionHeader";
import RpcDefinitionDescription from "@theme/RpcDefinitionDescription";
import RpcMethodText from "@theme/RpcMethodText";
import ProtosaurusImage from "@theme/ProtosaurusImage";

${pkg.descriptionMdx}

${servicesString}${messagesString}\n`.trimStart()
  );
}
