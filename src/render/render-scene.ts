type NodeDef = {
  id: string;
  asset: string;
  xPx: number;
  yPx: number;
  iconWidthPx: number;
};

export function renderScene(
  scene: { baseWidthPx: number; baseHeightPx: number; nodes: NodeDef[] },
  viewportW: number,
  viewportH: number
) {
  const scale = Math.min(
    viewportW / scene.baseWidthPx,
    viewportH / scene.baseHeightPx
  );

  const nodesHtml = scene.nodes
    .map(
      (n) => `
      <div
        class="node"
        style="
          left:${n.xPx * scale}px;
          top:${n.yPx * scale}px;
          width:${n.iconWidthPx * scale}px;
        "
      >
        <img
          src="/hacsfiles/Neon-energy-flow-card/assets/${n.asset}"
          style="width:100%;height:auto;"
          draggable="false"
        />
      </div>
    `
    )
    .join("");

  return `
    <div
      class="scene"
      style="
        width:${scene.baseWidthPx * scale}px;
        height:${scene.baseHeightPx * scale}px;
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
      "
    >
      ${nodesHtml}
    </div>
  `;
}
