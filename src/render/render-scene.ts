import { renderLinksCanvas } from "./render-links";

export type Point = { x: number; y: number };

export type BackgroundLayer = {
  id: string;
  asset: string;
};

export type SceneMeta = {
  baseWidthPx: number;
  baseHeightPx: number;
  assetRoot: string;
};

export type SceneNode = {
  id: string;
  asset: string;
  xPx: number;
  yPx: number;
  widthPx: number;
};

export type SceneLink = {
  id: string;
  from: string;
  to: string;
  flowType: string;
  path: Point[];
};

export type Scene = {
  meta: SceneMeta;
  background: {
    layers: BackgroundLayer[];
  };
  nodes: SceneNode[];
  links: SceneLink[]; // ✅ DODANE – bo masz to w SCENE_V1
};

export function renderScene(
  scene: Scene,
  viewportW: number,
  viewportH: number
): HTMLElement {
  const scale = Math.min(
    viewportW / scene.meta.baseWidthPx,
    viewportH / scene.meta.baseHeightPx
  );

  const sceneW = scene.meta.baseWidthPx * scale;
  const sceneH = scene.meta.baseHeightPx * scale;

  const assetBase = `/hacsfiles/Neon-energy-flow-card/${scene.meta.assetRoot}`;

  // wrapper = cała scena (background + canvas + nodes)
  const wrapper = document.createElement("div");
  wrapper.className = "scene";
  wrapper.style.width = `${sceneW}px`;
  wrapper.style.height = `${sceneH}px`;
  wrapper.style.position = "relative";

  // --- BACKGROUND LAYERS ---
  for (const layer of scene.background.layers) {
    const img = document.createElement("img");
    img.className = "background-layer";
    img.src = `${assetBase}/${layer.asset}`;
    img.style.width = `${sceneW}px`;
    img.style.height = `${sceneH}px`;
    img.draggable = false;
    wrapper.appendChild(img);
  }

  // --- LINKS (CANVAS) ---
  // Canvas rysuje linki po geometrii scene.links
  const linksCanvas = renderLinksCanvas(scene, scale);
  wrapper.appendChild(linksCanvas);

  // --- NODES ---
  for (const n of scene.nodes) {
    const node = document.createElement("div");
    node.className = "node";
    node.style.left = `${n.xPx * scale}px`;
    node.style.top = `${n.yPx * scale}px`;
    node.style.width = `${n.widthPx * scale}px`;

    const img = document.createElement("img");
    img.src = `${assetBase}/${n.asset}`;
    img.style.width = "100%";
    img.style.height = "auto";
    img.draggable = false;

    node.appendChild(img);
    wrapper.appendChild(node);
  }

  return wrapper;
}
