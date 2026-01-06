import { SCENE_V1 } from "./scene/scene-v1";
import { renderScene } from "./render/render-scene";

class NeonEnergyFlowCard extends HTMLElement {
  private _resizeObserver?: ResizeObserver;
  private _root?: HTMLDivElement;

  set hass(hass: any) {}

  setConfig(config: any) {
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
          height: 100vh;
          overflow: hidden;
          background: #0b1020;
        }

        .scene {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
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

    this._root = this.querySelector(".card-root")!;
    this.render();

    this._resizeObserver = new ResizeObserver(() => this.render());
    this._resizeObserver.observe(this._root);
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect();
  }

  render() {
    if (!this._root) return;

    const rect = this._root.getBoundingClientRect();
    const vw = rect.width;
    const vh = rect.height;

    const container = this.querySelector(".scene-container")!;
    container.innerHTML = renderScene(SCENE_V1, vw, vh);
  }
}

customElements.define("neon-energy-flow-card", NeonEnergyFlowCard);
