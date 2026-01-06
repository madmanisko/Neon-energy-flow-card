import { LitElement, html, css } from "lit";
import { SCENE_OPTIONS, type SceneId } from "../scene/scene-registry";

type NeonEnergyFlowCardConfig = {
  scene?: SceneId;
};

class NeonEnergyFlowCardEditor extends LitElement {
  private _config: NeonEnergyFlowCardConfig = {};

  static styles = css`
    .section {
      margin-bottom: 16px;
    }
    .section-title {
      font-weight: 600;
      margin-bottom: 8px;
    }
  `;

  setConfig(config: NeonEnergyFlowCardConfig) {
    this._config = { ...(config ?? {}) };
  }

  private _emitConfigChanged() {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onSceneChanged(ev: CustomEvent) {
    ev.stopPropagation();

    const scene = ev.detail.value as SceneId;
    if (!scene) return;

    this._config = { ...this._config, scene };
    this._emitConfigChanged();
  }

  private _stopClose(ev: Event) {
    ev.stopPropagation();
  }

  render() {
    const current = this._config.scene ?? "wide_v1";

    return html`
      <div class="section">
        <div class="section-title">General Settings</div>

        <ha-select
          label="Style card"
          .value=${current}
          @value-changed=${this._onSceneChanged}
          @closed=${this._stopClose}
        >
          ${SCENE_OPTIONS.map(
            (opt) => html`<mwc-list-item .value=${opt.value}>${opt.label}</mwc-list-item>`
          )}
        </ha-select>
      </div>
    `;
  }
}

customElements.define("neon-energy-flow-card-editor", NeonEnergyFlowCardEditor);
