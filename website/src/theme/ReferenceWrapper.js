import React from "react";
import styles from "./ReferenceWrapper.module.css";

export default function ReferenceWrapper({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}
