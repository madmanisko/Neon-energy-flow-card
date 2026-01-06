// src/scene/scene-v1.ts
var SCENE_V1 = {
  meta: {
    id: "v1",
    aspect: "16:9",
    baseWidthPx: 1680,
    baseHeightPx: 1080,
    assetRoot: "assets/v1"
  },
  background: {
    layers: [
      {
        id: "base",
        asset: "background/base.png"
      }
      // w przyszłości:
      // { id: "overlay", asset: "background/overlay.png" }
    ]
  },
  nodes: [
    {
      id: "pv",
      asset: "nodes/pv.png",
      xPx: 840,
      yPx: 170,
      widthPx: 573
    },
    {
      id: "inverter",
      asset: "nodes/inverter.png",
      xPx: 840,
      yPx: 540,
      widthPx: 135
    },
    {
      id: "battery",
      asset: "nodes/battery.png",
      xPx: 460,
      yPx: 700,
      widthPx: 150
    },
    {
      id: "grid",
      asset: "nodes/meter.png",
      xPx: 1220,
      yPx: 700,
      widthPx: 106
    },
    {
      id: "home",
      asset: "nodes/home.png",
      xPx: 840,
      yPx: 910,
      widthPx: 287
    }
  ],
  links: []
};

// src/render/render-scene.ts
function renderScene(scene, viewportW, viewportH) {
  const scale = Math.min(
    viewportW / scene.meta.baseWidthPx,
    viewportH / scene.meta.baseHeightPx
  );
  const sceneW = scene.meta.baseWidthPx * scale;
  const sceneH = scene.meta.baseHeightPx * scale;
  const assetBase = `/hacsfiles/Neon-energy-flow-card/${scene.meta.assetRoot}`;
  const backgroundHtml = scene.background.layers.map(
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
  ).join("");
  const nodesHtml = scene.nodes.map(
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
  ).join("");
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

// src/Neon-energy-flow-card.ts
var NeonEnergyFlowCard = class extends HTMLElement {
  _resizeObserver;
  _root;
  set hass(hass) {
  }
  setConfig(config) {
    if (!config) throw new Error("Config required");
  }
  connectedCallback() {
    this.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }

        .card-root {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #0b1020;
        }

        .scene {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          overflow: hidden;
          pointer-events: none;
        }

        .background-layer {
          position: absolute;
          inset: 0;
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

      <div class="card-root">
        <div class="scene-container"></div>
      </div>
    `;
    this._root = this.querySelector(".card-root");
    this.render();
    const haViewport = this.closest("hui-panel-view") || this.closest("hui-root") || this._root;
    this._resizeObserver = new ResizeObserver(() => this.render());
    this._resizeObserver.observe(haViewport);
  }
  disconnectedCallback() {
    this._resizeObserver?.disconnect();
  }
  /**
   * Zwraca rzeczywisty obszar, w którym HA wyświetla panel.
   * W panel: true HA często NIE wywołuje window.resize, więc nie opieramy się na window.innerHeight.
   */
  _getViewportSize() {
    const panel = this.closest("hui-panel-view");
    if (panel) {
      const r2 = panel.getBoundingClientRect();
      return { vw: r2.width, vh: r2.height };
    }
    const root = this.closest("hui-root");
    if (root) {
      const r2 = root.getBoundingClientRect();
      return { vw: r2.width, vh: r2.height };
    }
    const r = this._root?.getBoundingClientRect();
    return {
      vw: r?.width ?? window.innerWidth,
      vh: r?.height ?? window.innerHeight
    };
  }
  render() {
    if (!this._root) return;
    const { vw, vh } = this._getViewportSize();
    const container = this.querySelector(".scene-container");
    container.innerHTML = renderScene(SCENE_V1, vw, vh);
  }
};
customElements.define("neon-energy-flow-card", NeonEnergyFlowCard);
