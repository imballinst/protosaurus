// Copyright 2022 Protosaurus Authors
// Licensed under the Apache License, Version 2.0 (the "License")

import React, { ReactNode } from "react";
import styles from "./Definition.module.css";

interface DefinitionProps {
  children: ReactNode;
}

export default function Definition({ children }: DefinitionProps) {
  return <div className={styles["definition"]}>{children}</div>;
}
