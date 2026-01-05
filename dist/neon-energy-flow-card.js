import { BASE_SCENE } from "./scene/scene-v1.js";
import { renderScene } from "./render/render-scene.js";

class NeonEnergyFlowCard extends HTMLElement {
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

        .scene {
          position: absolute;
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

      ${renderScene(BASE_SCENE, vw, vh)}
    `;
  }
}

customElements.define("neon-energy-flow-card", NeonEnergyFlowCard);
