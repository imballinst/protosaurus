import React from "react";
import styles from "./Definition.module.css";

export default function RpcDefinition({ children }) {
  return <div className={styles["rpc-definition"]}>{children}</div>;
}
