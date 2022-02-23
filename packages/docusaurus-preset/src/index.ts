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

import type { Preset, LoadContext } from '@docusaurus/types';
import docusaurusPresetClassic from '@docusaurus/preset-classic/lib';
import type { Options } from '@docusaurus/preset-classic';

import protoMessageRehypePlugin from '@protosaurus/rehype-plugin-codeblock';

export type ProtosaurusPresetEntry = ['docusaurus-preset'];
export type ProtosaurusPresetOptions = Options;

export default function protosaurusPreset(
  context: LoadContext,
  options: Options
): Preset {
  const presetOpts = options;
  const rehypePlugin = [protoMessageRehypePlugin, { siteDir: __dirname }];

  if (typeof presetOpts?.docs === 'object') {
    presetOpts.docs.rehypePlugins = presetOpts?.docs.rehypePlugins
      ? [...presetOpts?.docs.rehypePlugins, rehypePlugin]
      : ([rehypePlugin] as any);
  }

  const presetClassic = docusaurusPresetClassic(context, presetOpts);

  return {
    themes: [
      ...(presetClassic.themes || []),
      require.resolve('@protosaurus/docusaurus-theme')
    ],
    plugins: presetClassic.plugins
  };
}
