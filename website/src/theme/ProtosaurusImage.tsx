import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

import styles from "./ProtosaurusImage.module.css";

interface ProtosaurusImageProps {
  alt: string;
  src: string;
}

export default function ProtosaurusImage({ alt, src }: ProtosaurusImageProps) {
  return createPortal(
    <>
      <div className={styles["protosaurus-image"]}>
        <img src={src} alt={alt} className={styles["image"]} />
      </div>
    </>,
    document.body
  );
}
