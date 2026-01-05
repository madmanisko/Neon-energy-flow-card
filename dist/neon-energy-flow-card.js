class NeonEnergyFlowCard extends HTMLElement {
  setConfig(config) {
    this._config = config;
  }
  set hass(hass) {
    this._hass = hass;
  }
connectedCallback() {
  this.innerHTML = `
    <div style="
      position: relative;
      width: 100%;
      height: 500px;
      background: #0b1020;
      overflow: hidden;
    ">
      <img
        src="/hacsfiles/Neon-energy-flow-card/assets/Background.png"
        style="
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        "
      />
    </div>
  `;
}

}
customElements.define("neon-energy-flow-card", NeonEnergyFlowCard);
