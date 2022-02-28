/**
 * Copyright 2022 Protosaurus Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useState } from 'react';
import { usePopper } from 'react-popper';

import styles from './ProtosaurusImage.module.css';

export default function ProtosaurusImage() {
  const [popperAnnotations, setPopperAnnotations] = useState<string[]>([]);

  useEffect(() => {
    const buttons = document.getElementsByClassName(
      '__button-protosaurus-annotation__'
    );
    const annotations: string[] = [];
    let i = 0;

    while (i < buttons.length) {
      const element = buttons.item(i) as HTMLButtonElement;
      annotations.push(element.dataset['title'] || '');
      i++;
    }

    setPopperAnnotations(annotations);
  }, []);

  if (popperAnnotations.length) {
    return (
      <>
        {popperAnnotations.map((annotation) => (
          <PopperComponent annotationTitle={annotation} />
        ))}
      </>
    );
  }

  return null;
}

function PopperComponent({ annotationTitle }: { annotationTitle: string }) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }]
  });

  useEffect(() => {
    const button = document.querySelector(
      `p[data-title="${annotationTitle}"]`
    ) as HTMLButtonElement;
    if (button) {
      setReferenceElement(button);
    }
    console.log(button);
  }, [annotationTitle]);

  return (
    <>
      <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        Popper element
        <div ref={setArrowElement} style={styles.arrow} />
      </div>
    </>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" className={styles['close-icon']}>
      <path
        fill="currentColor"
        d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
      ></path>
    </svg>
  );
}
