// Copyright 2022 Protosaurus Authors
// Licensed under the Apache License, Version 2.0 (the "License")

import React from "react";
import styles from "./Description.module.css";

export default function Description({ children }) {
  return (
    <div className={styles.description}>
      <div className={styles["description-title"]}>Description</div>

      <div>{children}</div>
    </div>
  );
}
