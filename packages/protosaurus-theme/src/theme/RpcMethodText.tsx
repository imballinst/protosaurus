// Copyright 2022 Protosaurus Authors
// Licensed under the Apache License, Version 2.0 (the "License")

import React, { ReactNode } from "react";
import styles from "./Definition.module.css";

interface RpcMethodTextProps {
  type: "request" | "response";
  isStream?: boolean;
  children: ReactNode;
}

export default function RpcMethodText({
  type,
  isStream,
  children,
}: RpcMethodTextProps) {
  return (
    <div className={styles["rpc-method"]}>
      <span className={styles["rpc-method-options"]}>{type}</span>
      {children}
      {isStream ? (
        <span className={styles["rpc-method-options-stream"]}>stream</span>
      ) : null}
    </div>
  );
}
