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
        }

        .card-root {
          position: relative;
          width: 100%;
          height: 100vh; /* KLUCZOWE */
          overflow: hidden;
          background: #0b1020;
        }

        .background {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
        }

        .scene {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .node {
          position: absolute;
          transform: translate(-50%, -50%);
          pointer-events: none;
          user-select: none;
        }
      </style>

      <div class="card-root">
        <img
          class="background"
          src="/hacsfiles/Neon-energy-flow-card/assets/background.png"
        />
        <div class="scene"></div>
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

    const sceneEl = this.querySelector(".scene")!;
    sceneEl.innerHTML = renderScene(SCENE_V1, vw, vh);
  }
}

customElements.define("neon-energy-flow-card", NeonEnergyFlowCard);
