import { SCENE_V1 } from "./scene/scene-v1";
import { renderScene } from "./render/render-scene";

class NeonEnergyFlowCard extends HTMLElement {
  private _resizeObserver?: ResizeObserver;

  set hass(hass: any) {}

  setConfig(config: any) {
    if (!config) throw new Error("Config required");
  }

  connectedCallback() {
    // pierwszy render
    this.render();

    // reagowanie na zmianę rozmiaru hosta (np. wysuwanie belki HA)
    this._resizeObserver = new ResizeObserver(() => {
      this.render();
    });
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    // sprzątanie
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
}

customElements.define("Neon-energy-flow-card", NeonEnergyFlowCard);
