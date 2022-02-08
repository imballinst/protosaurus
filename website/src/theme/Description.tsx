// Copyright 2022 Protosaurus Authors
// Licensed under the Apache License, Version 2.0 (the "License")

import React, { ReactNode } from "react";
import styles from "./Description.module.css";

interface DescriptionProps {
  children: ReactNode;
}

export default function Description({ children }: DescriptionProps) {
  return (
    <div className={styles.description}>
      <div className={styles["description-title"]}>Description</div>

      <div>{children}</div>
    </div>
  );
}
