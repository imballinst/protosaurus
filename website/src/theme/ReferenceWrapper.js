// Copyright 2022 Protosaurus Authors
// Licensed under the Apache License, Version 2.0 (the "License")

import React from "react";
import styles from "./ReferenceWrapper.module.css";

export default function ReferenceWrapper({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}
