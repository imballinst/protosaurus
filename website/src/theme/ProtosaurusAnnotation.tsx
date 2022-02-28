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
import { createPopper, Instance as PopperInstance } from '@popperjs/core';

export default function ProtosaurusAnnotation() {
  const [popperButtons, setPopperButtons] = useState<HTMLButtonElement[]>([]);

  useEffect(() => {
    const buttons = document.getElementsByClassName(
      'protosaurus-popper-button'
    );
    const poppers = document.getElementsByClassName('protosaurus-popper');
    const instances: PopperInstance[] = [];
    let i = 0;

    function show(tooltip: HTMLDivElement, popperInstance: PopperInstance) {
      // Make the tooltip visible
      tooltip.setAttribute('data-show', '');

      // Enable the event listeners
      popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: true }
        ]
      }));

      // Update its position
      popperInstance.update();
    }

    function hide(tooltip: HTMLDivElement, popperInstance: PopperInstance) {
      // Hide the tooltip
      tooltip.removeAttribute('data-show');

      // Disable the event listeners
      popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: false }
        ]
      }));
    }

    while (i < buttons.length) {
      const button = buttons.item(i) as HTMLButtonElement;
      const popper = poppers.item(i) as HTMLDivElement;

      instances.push(
        createPopper(button, popper, {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 8]
              }
            }
          ]
        })
      );
      i++;
    }

    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];

    i = 0;

    while (i < buttons.length) {
      const button = buttons.item(i) as HTMLButtonElement;
      const popper = poppers.item(i) as HTMLDivElement;

      showEvents.forEach((event) => {
        button.addEventListener(event, () => show(popper, instances[i]));
      });
      hideEvents.forEach((event) => {
        button.addEventListener(event, () => hide(popper, instances[i]));
      });

      i++;
    }

    return () => {
      i = 0;

      while (i < buttons.length) {
        const button = buttons.item(i) as HTMLButtonElement;
        const popper = poppers.item(i) as HTMLDivElement;

        showEvents.forEach((event) => {
          button.addEventListener(event, () => show(popper, instances[i]));
        });
        hideEvents.forEach((event) => {
          button.addEventListener(event, () => hide(popper, instances[i]));
        });

        i++;
      }
    };
  }, []);

  if (popperButtons.length) {
    return <></>;
  }

  return null;
}