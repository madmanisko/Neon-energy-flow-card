class NeonEnergyFlowCard extends HTMLElement {
  set hass(hass: any) {}

  setConfig(config: any) {
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
        Energy Flow Card – DEV
      </div>
    `;
  }
}

customElements.define("Neon-energy-flow-card", NeonEnergyFlowCard);
