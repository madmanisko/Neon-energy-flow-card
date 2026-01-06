type BackgroundLayer = {
  id: string;
  asset: string;
};

type SceneMeta = {
  baseWidthPx: number;
  baseHeightPx: number;
  assetRoot: string;
};

type SceneNode = {
  id: string;
  asset: string;
  xPx: number;
  yPx: number;
  widthPx: number;
};

type Scene = {
  meta: SceneMeta;
  background: {
    layers: BackgroundLayer[];
  };
  nodes: SceneNode[];
};

export function renderScene(
  scene: Scene,
  viewportW: number,
  viewportH: number
) {
  const scale = Math.min(
    viewportW / scene.meta.baseWidthPx,
    viewportH / scene.meta.baseHeightPx
  );

  const sceneW = scene.meta.baseWidthPx * scale;
  const sceneH = scene.meta.baseHeightPx * scale;

  const assetBase = `/hacsfiles/Neon-energy-flow-card/${scene.meta.assetRoot}`;

  const backgroundHtml = scene.background.layers
    .map(
      (layer) => `
        <img
          class="background-layer"
          src="${assetBase}/${layer.asset}"
          style="
            width: ${sceneW}px;
            height: ${sceneH}px;
          "
          draggable="false"
        />
      `
    )
    .join("");

  const nodesHtml = scene.nodes
    .map(
      (n) => `
        <div
          class="node"
          style="
            left: ${n.xPx * scale}px;
            top: ${n.yPx * scale}px;
            width: ${n.widthPx * scale}px;
          "
        >
          <img
            src="${assetBase}/${n.asset}"
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
        width: ${sceneW}px;
        height: ${sceneH}px;
      "
    >
      ${backgroundHtml}
      ${nodesHtml}
    </div>
  `;
}
