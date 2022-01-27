// Copyright 2022 Protosaurus Authors
// Licensed under the Apache License, Version 2.0 (the "License")

import React from "react";
import styles from "./Definition.module.css";

export default function Definition({ children }) {
  return <div className={styles["definition"]}>{children}</div>;
}
