class NeonEnergyFlowCard extends HTMLElement {
  set hass(hass: any) {}

  setConfig(config: any) {
    if (!config) throw new Error("Config required");
  }

  connectedCallback() {
    this.innerHTML = `
      <style>
        :host {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100svh;
          overflow: hidden;
          background: #0b1020;
        }

        .background {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      </style>

      <img
        class="background"
        src="/hacsfiles/Neon-energy-flow-card/assets/background.png"
      />
    `;
  }
}

customElements.define("Neon-energy-flow-card", NeonEnergyFlowCard);
