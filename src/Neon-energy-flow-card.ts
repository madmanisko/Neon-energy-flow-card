import { renderScene } from "./render/render-scene";
import { SCENES, type SceneId } from "./scene/scene-registry";
import "./editor/neon-energy-flow-card-editor";

type NeonEnergyFlowCardConfig = {
  scene?: SceneId;
};

class NeonEnergyFlowCard extends HTMLElement {
  private _resizeObserver?: ResizeObserver;
  private _root?: HTMLDivElement;
  private _config: NeonEnergyFlowCardConfig = {};

  set hass(hass: any) {}

  setConfig(config: NeonEnergyFlowCardConfig) {
    if (!config) throw new Error("Config required");
    this._config = { ...(config ?? {}) };
    this.render();
  }

  static getConfigElement() {
    return document.createElement("neon-energy-flow-card-editor");
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

    // Observe HA viewport (panel view)
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

    const r = this._root?.getBoundingClientRect();
    return {
      vw: r?.width ?? window.innerWidth,
      vh: r?.height ?? window.innerHeight,
    };
  }

  render() {
    if (!this._root) return;

    const { vw, vh } = this._getViewportSize();
    const sceneId: SceneId = this._config.scene ?? "wide_v1";
    const scene = SCENES[sceneId] ?? SCENES["wide_v1"];

    const container = this.querySelector(".scene-container") as HTMLElement;
    container.innerHTML = renderScene(scene, vw, vh);
  }
}

customElements.define("neon-energy-flow-card", NeonEnergyFlowCard);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "neon-energy-flow-card",
  name: "Neon Energy Flow Card",
  description: "Cinematic neon energy flow visualization"
});
