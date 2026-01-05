class NeonEnergyFlowCard extends HTMLElement {
  setConfig(config) {
    this._config = config;
  }
  set hass(hass) {
    this._hass = hass;
  }
connectedCallback() {
  this.innerHTML = `
    <ha-card style="
      padding: 0;
      overflow: hidden;
    ">
      <div style="
        position: relative;
        width: 100vw;
        height: 1000vh;   /* <-- TU JEST KLUCZ */
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
          "
        />
      </div>
    </ha-card>
  `;
}


}
customElements.define("neon-energy-flow-card", NeonEnergyFlowCard);
