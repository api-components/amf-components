import { html } from 'lit-html';
import '@anypoint-web-components/anypoint-checkbox/anypoint-checkbox.js';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import { AmfDemoBase } from './lib/AmfDemoBase.js';
import '../api-server-selector.js';
import '../api-navigation.js';

/** @typedef {import('../src/events/NavigationEvents').ApiNavigationEvent} ApiNavigationEvent */

class ComponentDemo extends AmfDemoBase {
  constructor() {
    super();

    this.initObservableProperties([
      "renderCustom",
      "selectedServer",
      "selectedType",
      "allowCustom",
      "serversCount",
      "autoSelect",
      'selectedShape',
      'selectedShapeType',
    ]);
    this.componentName = 'api-server-selector';
    this.renderViewControls = true;
    this.darkThemeActive = false;
    this.demoStates = ["Filled", "Outlined", "Anypoint"];
    this.renderCustom = false;
    this.allowCustom = true;
    this.autoSelect = true;
  }

  /**
   * @param {CustomEvent} e 
   */
  _demoStateHandler(e) {
    const state = e.detail.value;
    this.demoState = state;
    this.outlined = state === 1;
    this.compatibility = state === 2;
    this._updateCompatibility();
  }

  /**
   * @param {ApiNavigationEvent} e
   */
  _navChanged(e) {
    const { domainId, domainType } = e.detail;
    if (["operation", "resource"].indexOf(domainType) === -1) {
      this.servers = null;
      return;
    }
    this.selectedShape = domainId;
    this.selectedShapeType = domainType;
  }

  /**
   * @param {CustomEvent} e 
   */
  _apiSrvHandler(e) {
    const { value, type } = e.detail;
    this.selectedServer = value;
    this.selectedType = type;
    console.log("Selection changed", value, type);
  }

  /**
   * @param {CustomEvent} e 
   */
  _countHandler(e) {
    this.serversCount = e.detail.value;
  }

  _apiListTemplate() {
    return [
      ["servers-api", "Servers API"],
      ["no-servers-api", "No Servers API"],
    ].map(
      ([file, label]) => html`
        <anypoint-item data-src="models/${file}-compact.json">${label}</anypoint-item>
      `
    );
  }

  contentTemplate() {
    return html`
      <h2>API Server Selector</h2>
      ${this.demoTemplate()}
    `;
  }

  demoTemplate() {
    const { loaded } = this;
    return html`
    <section class="documentation-section">
      <h3>Interactive demo</h3>
      <p>
        This demo lets you preview the OAS' server selector element with
        various configuration options.
      </p>
      ${!loaded ? html`<p>Load an API model first.</p>` : this.loadedTemplate()}
    </section>`;
  }

  loadedTemplate() {
    return html`
    ${this.componentTemplate()}
    `;
  }

  componentTemplate() {
    const {
      amf,
      demoStates,
      darkThemeActive,
      compatibility,
      outlined,
      demoState,
      allowCustom,
      selectedServer,
      serversCount,
      autoSelect,
      selectedShape,
      selectedShapeType,
    } = this;
    return html`
    <arc-interactive-demo
      .states="${demoStates}"
      .selectedState="${demoState}"
      @state-changed="${this._demoStateHandler}"
      ?dark="${darkThemeActive}"
    >
      <div class="selector-container" slot="content">
        <api-server-selector
          .amf="${amf}"
          ?compatibility="${compatibility}"
          ?allowCustom="${allowCustom}"
          ?outlined="${outlined}"
          ?autoSelect="${autoSelect}"
          .selectedShape="${selectedShape}"
          .selectedShapeType="${selectedShapeType}"
          @apiserverchanged="${this._apiSrvHandler}"
          @serverscountchanged="${this._countHandler}"
        >
          ${this._extraSlotItems()}
        </api-server-selector>
      </div>
      <label slot="options" id="mainOptionsLabel">Options</label>
      <anypoint-checkbox
        aria-describedby="mainOptionsLabel"
        slot="options"
        name="renderCustom"
        @change="${this._toggleMainOption}"
        >Add custom srv</anypoint-checkbox
      >
      <anypoint-checkbox
        aria-describedby="mainOptionsLabel"
        slot="options"
        name="allowCustom"
        checked
        @change="${this._toggleMainOption}"
        >Allow Custom</anypoint-checkbox
      >
      <anypoint-checkbox
        aria-describedby="mainOptionsLabel"
        slot="options"
        name="autoSelect"
        checked
        @change="${this._toggleMainOption}"
        >Auto select server</anypoint-checkbox
      >
    </arc-interactive-demo>

    ${selectedServer ? html`<p>Selected: ${selectedServer}</p>` : ""}
    ${serversCount ? html`<p>Servers count: ${serversCount}</p>` : ""}
    `;
  }

  _extraSlotItems() {
    if (!this.renderCustom) {
      return "";
    }
    const { compatibility } = this;
    return html` <div class="other-section" slot="custom-base-uri">
        Other options
      </div>
      <anypoint-item
        slot="custom-base-uri"
        data-value="http://customServer.com"
        ?compatibility="${compatibility}"
      >
        Mocking service
      </anypoint-item>
      <anypoint-item
        slot="custom-base-uri"
        data-value="http://customServer2.com"
        ?compatibility="${compatibility}"
      >
        Custom instance
      </anypoint-item>
      <anypoint-item slot="custom-base-uri" ?compatibility="${compatibility}">
        Unselectable
      </anypoint-item>`;
  }
}
const instance = new ComponentDemo();
instance.render();
