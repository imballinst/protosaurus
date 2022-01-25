import React from "react";

export default function TableOfContents({ json }) {
  // TODO(imballinst): styling.
  return (
    <ul>
      {json.map((tree) => (
        <TreeItem tree={tree} />
      ))}
    </ul>
  );
}

function TreeItem({ tree }) {
  return (
    <li>
      <a href={tree.href}>{tree.title}</a>

      {tree.children && (
        <ul>
          {tree.children.map((c) => (
            <TreeItem tree={c} />
          ))}
        </ul>
      )}
    </li>
  );
}
