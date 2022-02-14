// Copyright 2022 Protosaurus Authors
// Licensed under the Apache License, Version 2.0 (the "License")

import React, { ReactNode } from "react";
import styles from "./Definition.module.css";

interface DefinitionHeaderProps {
  requestType: string;
  responseType: string;
  requestTypePrefix?: string;
  responseTypePrefix?: string;
  children: ReactNode;
}

export default function DefinitionHeader({
  requestTypePrefix,
  requestType,
  responseTypePrefix,
  responseType,
  children,
}: DefinitionHeaderProps) {
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

function Type({ prefix, children }: { prefix?: string; children: ReactNode }) {
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
