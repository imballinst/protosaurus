// Copyright 2022 Protosaurus Authors
// Licensed under the Apache License, Version 2.0 (the "License")

import React, { ReactNode } from "react";
import styles from "./ReferenceWrapper.module.css";

interface ReferenceWrapperProps {
  children: ReactNode;
}

export default function ReferenceWrapper({ children }: ReferenceWrapperProps) {
  return <div className={styles.wrapper}>{children}</div>;
}
