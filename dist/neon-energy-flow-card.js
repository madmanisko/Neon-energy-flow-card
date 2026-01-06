// src/Neon-energy-flow-card.ts
var NeonEnergyFlowCard = class extends HTMLElement {
  set hass(hass) {
  }
  setConfig(config) {
    if (!config) throw new Error("Config required");
  }
  connectedCallback() {
    this.innerHTML = `
      <div style="
        width:100%;
        height:300px;
        background:#0b1020;
        color:#00ffff;
        display:flex;
        align-items:center;
        justify-content:center;
        font-family:monospace;
      ">
        Energy Flow Card \u2013 DEV
      </div>
    `;
  }
};
customElements.define("Neon-energy-flow-card", NeonEnergyFlowCard);
