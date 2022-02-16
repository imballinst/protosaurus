/**
 * Copyright 2022 Protosaurus Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { writeFileSync } from "fs-extra";
import { PackageData } from "./types";

// Main exported functions.
export function emitMdx(filePath: string, pkg: PackageData) {
  const services = pkg.servicesData.map((m) => m.body).join("\n\n");
  const messages = pkg.messagesData.map((m) => m.body).join("\n\n");

  const servicesString = services.length ? `## Services\n\n${services}` : "";
  const messagesString = messages.length ? `## Messages\n\n${messages}` : "";

  return writeFileSync(
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

<ProtosaurusImage />

${pkg.descriptionMdx}

${servicesString}${messagesString}\n`.trimStart()
  );
}
