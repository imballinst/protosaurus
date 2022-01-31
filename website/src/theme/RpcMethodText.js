// Copyright 2022 Protosaurus Authors
// Licensed under the Apache License, Version 2.0 (the "License")

import React from "react";
import styles from "./Definition.module.css";

export default function RpcMethodText({ type, isStream, children }) {
  return (
    <div>
      <span className={styles["rpc-method-options"]}>{type}</span>
      {children}
      {isStream ? (
        <span className={styles["rpc-method-options-stream"]}>stream</span>
      ) : null}
    </div>
  );
}
