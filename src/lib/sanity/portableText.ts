type PortableTextSpan = { _type: "span"; text: string; marks?: string[] };
type PortableTextMarkDef = { _key: string; _type: string; href?: string };
type PortableTextBlock = {
  _type: "block";
  style?: string;
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
  listItem?: "bullet" | "number";
  level?: number;
};

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderSpans(
  children: PortableTextSpan[] = [],
  defs: PortableTextMarkDef[] = []
): string {
  const defMap = new Map(defs.map((d) => [d._key, d] as const));
  return children
    .map((span) => {
      let html = escapeHtml(span.text || "");
      for (const mark of span.marks || []) {
        if (mark === "strong") html = `<strong>${html}</strong>`;
        else if (mark === "em") html = `<em>${html}</em>`;
        else if (defMap.has(mark)) {
          const def = defMap.get(mark)!;
          if (def._type === "link" && def.href) {
            html = `<a href="${def.href}" target="_blank" rel="noopener noreferrer">${html}</a>`;
          }
        }
      }
      return html;
    })
    .join("");
}

export function portableTextToHtml(blocks: any[]): string {
  if (!Array.isArray(blocks)) return "";
  let html = "";
  let inList: "ul" | "ol" | null = null;

  const closeList = () => {
    if (inList) {
      html += `</${inList}>`;
      inList = null;
    }
  };

  for (const node of blocks as PortableTextBlock[]) {
    if (node._type !== "block") continue;

    // Lists
    if (node.listItem) {
      const listTag = node.listItem === "bullet" ? "ul" : "ol";
      if (inList !== listTag) {
        closeList();
        inList = listTag;
        html += `<${inList}>`;
      }
      html += `<li>${renderSpans(node.children, node.markDefs)}</li>`;
      continue;
    } else {
      closeList();
    }

    // Headings / paragraphs / blockquote
    const rawStyle = (node.style || "normal").toLowerCase();
    const inner = renderSpans(node.children, node.markDefs);
    let style = rawStyle;
    // Normalize common Studio aliases
    if (rawStyle === "title") style = "h1";
    if (rawStyle === "heading") style = "h2";

    if (/^h[1-6]$/.test(style)) {
      html += `<${style}>${inner}</${style}>`;
    } else if (style === "blockquote") {
      html += `<blockquote>${inner}</blockquote>`;
    } else {
      html += `<p>${inner}</p>`;
    }
  }
  closeList();
  return html;
}
