import React from "react";
import styles from "./Definition.module.css";

export default function RpcDefinitionDescription({ children }) {
  return <div className={styles["rpc-definition-description"]}>{children}</div>;
}
