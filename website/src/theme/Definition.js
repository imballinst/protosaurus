import React from "react";
import styles from "./Definition.module.css";

export default function Definition({ children }) {
  return <div className={styles["definition-service"]}>{children}</div>;
}
