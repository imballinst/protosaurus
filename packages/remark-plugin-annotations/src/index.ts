import { Root, Paragraph } from 'mdast';

// What this does is just "remapping" the
// `footnoteDefinition` to `paragraph`, because otherwise,
// it will try to find "its pair" outside of code blocks, which of course,
// not what we want, because we want it to be possible inside and outside of code blocks.
export default function remarkPluginAnnotations() {
  return (tree: Root) => {
    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];

      if (child.type === 'footnoteDefinition') {
        const newChild: Paragraph = {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value: `[^${child.label}]: `
            },
            ...child.children.map((c: any) => c.children).flat()
          ]
        };
        tree.children[i] = newChild;
      }
    }
  };
}
