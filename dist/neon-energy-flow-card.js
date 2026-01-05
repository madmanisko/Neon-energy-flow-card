class NeonEnergyFlowCard extends HTMLElement {
  setConfig(config) {
    this._config = config;
  }
  set hass(hass) {
    this._hass = hass;
  }
connectedCallback() {
  this.innerHTML = `
    <style>
      :host {
        position: fixed;
        inset: 0;
        display: block;
        width: 100vw;
        height: 100svh;
        overflow: hidden;
      }
    </style>

    <div style="
      position: absolute;
      inset: 0;
      overflow: hidden;
      background: #0b1020;
    ">
      <img
        src="/hacsfiles/Neon-energy-flow-card/assets/background.png"
        style="
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        "
      />
    </div>
  `;
}



}
customElements.define("neon-energy-flow-card", NeonEnergyFlowCard);
