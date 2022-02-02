// Copyright 2022 Protosaurus Authors
// Licensed under the Apache License, Version 2.0 (the "License")

import React from "react";
import styles from "./Definition.module.css";

export default function DefinitionHeader({
  requestTypePrefix,
  requestType,
  responseTypePrefix,
  responseType,
  children,
}) {
  return (
    <div className={styles["rpc-definition-title"]}>
      <div className={styles["rpc-definition-name"]}>
        <span>rpc</span> {children}
      </div>

      <Type prefix={requestTypePrefix}>{requestType}</Type>

      <span> returns</span>
      <Type prefix={responseTypePrefix}>{responseType}</Type>
    </div>
  );
}

function Type({ prefix, children }) {
  let prefixJsx;

  if (prefix) {
    prefixJsx = (
      <>
        <span>{prefix}</span>{" "}
      </>
    );
  }

  return (
    <div>
      ({prefixJsx}
      {children})
    </div>
  );
}
