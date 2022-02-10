import React, { ReactNode, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./ProtosaurusImage.module.css";

interface ProtosaurusImageProps {
  alt: string;
  src: string;
}

// References used:
// 1. https://mui.com/components/modal/.
// 2. https://www.w3.org/TR/wai-aria-practices/#dialog_modal.
// 3. https://reactjs.org/docs/portals.html.
export default function ProtosaurusImage({ alt, src }: ProtosaurusImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dialogId = `image-label-${src}`;

  if (isModalOpen) {
    return createPortal(
      <div
        className={styles["container"]}
        role="dialog"
        aria-labelledby={dialogId}
      >
        <h2 id={dialogId} className={styles["hidden-label"]}>
          Overlay modal to show {alt}. Press "Escape" key or click the close
          button to close the modal.
        </h2>

        <div className={styles["close-button-container"]}>
          <button className={styles["close-button"]}>
            <CloseIcon />
          </button>
        </div>

        <div
          className={styles["backdrop"]}
          aria-hidden="true"
          onClick={() => setIsModalOpen(false)}
        />

        <a href={src} target="_blank" rel="noopener">
          <img src={src} alt={alt} className={styles["image"]} />
        </a>
      </div>,
      document.body
    );
  }

  return (
    <button
      className={styles["toggle-button"]}
      onClick={() => setIsModalOpen(true)}
    >
      {alt}
    </button>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <path
        fill="currentColor"
        d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
      ></path>
    </svg>
  );
}
