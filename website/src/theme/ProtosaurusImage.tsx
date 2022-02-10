import React, { ReactNode, useEffect, useState } from "react";
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
// 4. https://chakra-ui.com/docs/media-and-icons/icon.
// export default function ProtosaurusImage({ alt, src }: ProtosaurusImageProps) {
export default function ProtosaurusImage() {
  const [modalInfo, setModalInfo] = useState<
    | {
        src: string;
        alt: string;
        id: string;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    const buttons = document.getElementsByClassName(
      "__button-protosaurus-image-toggle__"
    );
    const elements: HTMLButtonElement[] = [];
    let i = 0;

    function onClick(event: MouseEvent) {
      const element = event.target as HTMLElement;
      const src = element.dataset["imageSrc"];
      const alt = element.dataset["imageAlt"];

      setModalInfo({
        src,
        alt,
        // Cleanup the slashes.
        id: `dialog-id-${src.replace(/\//g, "")}`,
      });
    }

    while (i < buttons.length) {
      const element = buttons.item(i) as HTMLButtonElement;

      element.addEventListener("click", onClick);
      elements.push(element);
      i++;
    }

    return () => {
      for (const element of elements) {
        element.removeEventListener("click", onClick);
      }
    };
  }, []);

  if (modalInfo) {
    const { alt, id, src } = modalInfo;

    return createPortal(
      <div className={styles["container"]} role="dialog" aria-labelledby={id}>
        <h2 id={id} className={styles["hidden-label"]}>
          Overlay modal to show {alt}. Press "Escape" key or click the close
          button to close the modal.
        </h2>

        <div
          className={styles["backdrop"]}
          aria-hidden="true"
          onClick={() => setModalInfo(undefined)}
        />

        <div className={styles["modal-content"]}>
          <div className={styles["close-button-container"]}>
            <button className={styles["close-button"]}>
              <CloseIcon />
            </button>
          </div>

          <a href={src} target="_blank" rel="noopener">
            <img src={src} alt={alt} className={styles["image"]} />
          </a>
        </div>
      </div>,
      document.body
    );
  }

  return null;
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" className={styles["close-icon"]}>
      <path
        fill="currentColor"
        d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
      ></path>
    </svg>
  );
}
