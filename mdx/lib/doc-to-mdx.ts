import fs from "fs-extra";

interface Protofile {
  name: string;
  title: string;
  description: string;
  package: string;
  hasEnums: false;
  hasExtensions: boolean;
  hasMessages: boolean;
  hasServices: boolean;
  // TODO(imballinst): create proper typing.
  enums: any;
  extensions: any;
  messages: ProtoMessage[];
  services: ProtoService[];
}

interface ProtoMessage {
  name: string;
  longName: string;
  fullName: string;
  description: string;
  hasExtensions: boolean;
  hasFields: boolean;
  hasOneofs: boolean;
  extensions: any[];
  fields: Field[];
}

interface Field {
  name: string;
  description: string;
  label: string;
  type: string;
  longType: string;
  fullType: string;
  ismap: boolean;
  isoneof: boolean;
  oneofdecl: string;
  defaultValue: string;
  options?: {
    [index: string]: any;
  };
}

interface ProtoService {
  name: string;
  longName: string;
  fullName: string;
  description: string;
  methods: {
    name: string;
    description: string;
    requestType: string;
    requestLongType: string;
    requestFullType: string;
    requestStreaming: boolean;
    responseType: string;
    responseLongType: string;
    responseFullType: string;
    responseStreaming: boolean;
    options: any;
  };
}

export async function convertPackageToMdx(packagePath: string) {
  const content = await fs.readFile(packagePath, "utf-8");
  const json: {
    files: Protofile[];
  } = JSON.parse(content);
  let text = "";

  for (const file of json.files) {
    if (!file.messages) {
      continue;
    }

    for (const message of file.messages) {
      text += getMessageString(message);
      text += "\n\n";
    }
  }

  return text;
}

function getMessageString(message: ProtoMessage) {
  return `
${getCommentString(message.description)}
message BookingStatus {
${message.fields.map((field, idx) => getField(field, idx + 1)).join("\n")}
}
  `.trim();
}

function getField(field: Field, num: number) {
  return `  ${getCommentString(field.description)}
  ${field.type} ${field.name} = ${num};`;
}

function getCommentString(comment: string) {
  const lines = comment.split("\n");
  for (let i = 0; i < lines.length; i++) {
    lines[i] = `// ${lines[i]}`;
  }

  return lines.join("\n");
}
