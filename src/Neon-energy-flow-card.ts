import { SCENE_V1 } from "./scene/scene-v1";
import { renderScene } from "./render/render-scene";

class NeonEnergyFlowCard extends HTMLElement {
  private _resizeObserver?: ResizeObserver;
  private _root?: HTMLDivElement;

  set hass(hass: any) {}

  setConfig(config: any) {
    if (!config) throw new Error("Config required");
  }

  connectedCallback() {
    this.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }

        .card-root {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #0b1020;
        }

        .scene {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          overflow: hidden;
          pointer-events: none;
        }

        .background-layer {
          position: absolute;
          inset: 0;
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

      <div class="card-root">
        <div class="scene-container"></div>
      </div>
    `;

    this._root = this.querySelector(".card-root")!;
    this.render();

    // Obserwujemy realny kontener HA (panel view / layout changes)
    const haViewport =
      (this.closest("hui-panel-view") as HTMLElement | null) ||
      (this.closest("hui-root") as HTMLElement | null) ||
      this._root;

    this._resizeObserver = new ResizeObserver(() => this.render());
    this._resizeObserver.observe(haViewport);
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect();
  }

  /**
   * Zwraca rzeczywisty obszar, w którym HA wyświetla panel.
   * W panel: true HA często NIE wywołuje window.resize, więc nie opieramy się na window.innerHeight.
   */
  private _getViewportSize() {
    const panel = this.closest("hui-panel-view") as HTMLElement | null;
    if (panel) {
      const r = panel.getBoundingClientRect();
      return { vw: r.width, vh: r.height };
    }

    const root = this.closest("hui-root") as HTMLElement | null;
    if (root) {
      const r = root.getBoundingClientRect();
      return { vw: r.width, vh: r.height };
    }

    // Fallback
    const r = this._root?.getBoundingClientRect();
    return {
      vw: r?.width ?? window.innerWidth,
      vh: r?.height ?? window.innerHeight
    };
  }

  render() {
    if (!this._root) return;

    // TU JEST KLUCZ: bierzemy rozmiar z realnego widoku HA, a nie z window
    const { vw, vh } = this._getViewportSize();

    const container = this.querySelector(".scene-container")!;
    container.innerHTML = renderScene(SCENE_V1, vw, vh);
  }
}

customElements.define("neon-energy-flow-card", NeonEnergyFlowCard);
