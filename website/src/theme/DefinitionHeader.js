import React from "react";
import styles from "./Definition.module.css";

export default function DefinitionHeader({ name, children }) {
  return (
    <div className={styles["definition-title"]}>
      <span>{name}</span>

      {children}
    </div>
  );
}
