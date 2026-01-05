import { renderNode } from "./render-node.js";

export function renderScene(scene, viewportWidth, viewportHeight) {
  const scale = Math.min(
    viewportWidth / scene.widthPx,
    viewportHeight / scene.heightPx
  );

  return `
    <div class="scene" style="
      width: ${scene.widthPx * scale}px;
      height: ${scene.heightPx * scale}px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    ">
      ${scene.nodes.map(n => renderNode(n, scale)).join("")}
    </div>
  `;
}
