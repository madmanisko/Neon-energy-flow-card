type Point = { x: number; y: number };

type SceneLink = {
  id: string;
  from: string;
  to: string;
  flowType: string;
  path: Point[];
};

export function renderLinksCanvas(
  scene: any,
  scale: number
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");

  const width = scene.meta.baseWidthPx * scale;
  const height = scene.meta.baseHeightPx * scale;

  canvas.width = Math.round(width);
  canvas.height = Math.round(height);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.style.position = "absolute";
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.pointerEvents = "none";

  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = 4 * scale;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "rgba(0, 255, 255, 0.35)";

  scene.links.forEach((link: SceneLink) => {
    const pts = link.path;
    if (!pts || pts.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(pts[0].x * scale, pts[0].y * scale);

    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x * scale, pts[i].y * scale);
    }

    ctx.stroke();
  });

  return canvas;
}
