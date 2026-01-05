export function renderNode(node, scale) {
  const left = node.xPx * scale;
  const top = node.yPx * scale;
  const width = node.iconWidthPx * scale;

  return `
    <div
      class="node"
      style="
        left: ${left}px;
        top: ${top}px;
        width: ${width}px;
      "
    >
      <img
        src="/hacsfiles/Neon-energy-flow-card/assets/${node.asset}"
        style="width: 100%; height: auto;"
        draggable="false"
      />
    </div>
  `;
}
