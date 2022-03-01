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

import React, { useEffect } from 'react';
import {
  ClientRectObject,
  createPopper,
  Instance as PopperInstance,
  Modifier
} from '@popperjs/core';

// This file perhaps a bit anti-pattern, because
// We are using React hooks to modify the DOM directly. However, this is necessary,
// because the `usePopper` isn't possible when it comes to "injecting" styles and attributes
// to HTML tags outside of the render lifecycle.
// Reference: https://popper.js.org/docs/v2/tutorial/.
export default function ProtosaurusAnnotation() {
  useEffect(() => {
    const buttons = document.getElementsByClassName(
      'protosaurus-popper-button'
    );
    const poppers = document.getElementsByClassName('protosaurus-popper');
    const instances: PopperInstance[] = [];
    let i = 0;

    // Basically, the "state" lives here.
    // Every time we hover the button, we will immediately show the popper.
    let timeout: number;

    function onHoverButton(
      tooltip: HTMLDivElement,
      popperInstance: PopperInstance
    ) {
      // Clear the timeout, so that it doesn't get hidden after hovering somewhere else.
      clearTimeout(timeout);
      // Make the tooltip visible.
      tooltip.setAttribute('data-show', '');

      // Enable the event listeners.
      popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...(options.modifiers || []),
          { name: 'eventListeners', enabled: true }
        ]
      }));

      // Update its position.
      popperInstance.update();
    }

    function onHoverPopper() {
      // Clear the timeout, so that it doesn't get hidden after hovering somewhere else.
      clearTimeout(timeout);
    }

    function onHide(tooltip: HTMLDivElement, popperInstance: PopperInstance) {
      // Clear the timeout, since we are going to assign it with a new one.
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        // Hide the tooltip.
        tooltip.removeAttribute('data-show');

        // Disable the event listeners.
        popperInstance.setOptions((options) => ({
          ...options,
          modifiers: [
            ...(options.modifiers || []),
            { name: 'eventListeners', enabled: false }
          ]
        }));
      }, 100);
    }

    // List of events that we want to add.
    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];

    while (i < buttons.length) {
      // Iterate each of the button and create a popper that is
      // "mapped" to the reference element (the button).
      const button = buttons.item(i) as HTMLButtonElement;
      const popper = poppers.item(i) as HTMLDivElement;

      instances.push(
        createPopper(button, popper, {
          placement: 'bottom',
          modifiers: [
            {
              name: 'offset',
              options: {
                // Move it down a bit.
                offset: [0, 4]
              }
            },
            {
              name: 'arrow',
              options: {
                // Center the arrow.
                padding: ({
                  popper,
                  reference
                }: {
                  popper: ClientRectObject;
                  reference: ClientRectObject;
                }) => popper.width / reference.width
              }
            }
          ]
        })
      );

      // Add event handlers.
      showEvents.forEach((event) => {
        button.addEventListener(event, () =>
          onHoverButton(popper, instances[i])
        );
        popper.addEventListener(event, onHoverPopper);
      });
      hideEvents.forEach((event) => {
        button.addEventListener(event, () => onHide(popper, instances[i]));
        popper.addEventListener(event, () => onHide(popper, instances[i]));
      });
      i++;
    }

    return () => {
      // Cleanup the events.
      i = 0;

      while (i < buttons.length) {
        const button = buttons.item(i) as HTMLButtonElement;
        const popper = poppers.item(i) as HTMLDivElement;

        showEvents.forEach((event) => {
          button.removeEventListener(event, () =>
            onHoverButton(popper, instances[i])
          );
          popper.removeEventListener(event, onHoverPopper);
        });
        hideEvents.forEach((event) => {
          button.removeEventListener(event, () => onHide(popper, instances[i]));
          popper.removeEventListener(event, () => onHide(popper, instances[i]));
        });

        i++;
      }
    };
  }, []);

  return null;
}
