// src/scene/scene-v1.ts
var SCENE_V1 = {
  baseWidthPx: 1536,
  baseHeightPx: 1024,
  nodes: [
    {
      id: "inverter",
      asset: "inverter.png",
      xPx: 768,
      yPx: 512,
      iconWidthPx: 135
    }
  ]
};

// src/render/render-scene.ts
function renderScene(scene, viewportW, viewportH) {
  const scale = Math.min(
    viewportW / scene.baseWidthPx,
    viewportH / scene.baseHeightPx
  );
  const nodesHtml = scene.nodes.map(
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
  ).join("");
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

// src/Neon-energy-flow-card.ts
var NeonEnergyFlowCard = class extends HTMLElement {
  _resizeObserver;
  set hass(hass) {
  }
  setConfig(config) {
    if (!config) throw new Error("Config required");
  }
  connectedCallback() {
    this.render();
    this._resizeObserver = new ResizeObserver(() => {
      this.render();
    });
    this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    this._resizeObserver?.disconnect();
  }
  render() {
    const rect = this.getBoundingClientRect();
    const vw = rect.width;
    const vh = rect.height;
    this.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          background: #0b1020;
        }

        .background {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          user-select: none;
        }

        .node {
          position: absolute;
          transform: translate(-50%, -50%);
          pointer-events: none;
          user-select: none;
        }
      </style>

      <img
        class="background"
        src="/hacsfiles/Neon-energy-flow-card/assets/background.png"
      />

      ${renderScene(SCENE_V1, vw, vh)}
    `;
  }
};
customElements.define("Neon-energy-flow-card", NeonEnergyFlowCard);
