class NeonEnergyFlowCard extends HTMLElement {
  setConfig(config) {
    this._config = config;
  }
  set hass(hass) {
    this._hass = hass;
  }
  connectedCallback() {
    this.style.display = "block";
    this.innerHTML = `
      <div style="height:300px;background:#0b1020;color:#00ffff;display:flex;align-items:center;justify-content:center;font-family:monospace;">
        Neon Energy Flow Card – DEV
      </div>
    `;
  }
}
customElements.define("neon-energy-flow-card", NeonEnergyFlowCard);
