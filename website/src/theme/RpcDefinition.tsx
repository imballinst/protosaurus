// Copyright 2022 Protosaurus Authors
// Licensed under the Apache License, Version 2.0 (the "License")

import React, { ReactNode } from "react";
import styles from "./Definition.module.css";

interface RpcDefinitionProps {
  children: ReactNode;
}

export default function RpcDefinition({ children }: RpcDefinitionProps) {
  return <div className={styles["rpc-definition"]}>{children}</div>;
}
