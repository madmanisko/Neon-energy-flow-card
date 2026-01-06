import { SCENE_V1 } from "./scene/scene-v1";
import { renderScene } from "./render/render-scene";


class NeonEnergyFlowCard extends HTMLElement {
  set hass(hass: any) {}

  setConfig(config: any) {
    if (!config) throw new Error("Config required");
  }

connectedCallback() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  this.innerHTML = `
    <style>
      :host {
        position: fixed;
        inset: 0;
        background: #0b1020;
        overflow: hidden;
      }
      .background {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .node {
        position: absolute;
        transform: translate(-50%, -50%);
        pointer-events: none;
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
