/* eslint-disable arrow-body-style */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import { html, LitElement } from 'lit-element';
import { EventsTargetMixin } from '@anypoint-web-components/awc';
import '@anypoint-web-components/awc/anypoint-input.js';
import '@anypoint-web-components/awc/anypoint-dropdown-menu.js';
import '@anypoint-web-components/awc/anypoint-listbox.js';
import '@anypoint-web-components/awc/anypoint-item.js';
import '@anypoint-web-components/awc/anypoint-icon-button.js';
import { close } from '@advanced-rest-client/icons/ArcIcons.js';
import elementStyles from './styles/ServerSelector.js';
import { Events } from '../events/Events.js';
import { EventTypes } from '../events/EventTypes.js';

/** @typedef {import('lit-html').TemplateResult} TemplateResult */
/** @typedef {import('@anypoint-web-components/awc').AnypointListboxElement} AnypointListboxElement */
/** @typedef {import('@anypoint-web-components/awc').AnypointDropdownElement} AnypointDropdownElement */
/** @typedef {import('../helpers/api').ApiServer} ApiServer */
/** @typedef {import('../types').SelectionInfo} SelectionInfo */
/** @typedef {import('../types').UpdateServersOptions} UpdateServersOptions */
/** @typedef {import('../types').SelectionType} SelectionType */

export const domainIdValue = Symbol('domainIdValue');
export const domainTypeValue = Symbol('domainTypeValue');
export const debounceValue = Symbol('debounceValue');
export const processDebounce = Symbol('processDebounce');
export const customNodesCount = Symbol('customNodesCount');
export const allowCustomValue = Symbol('allowCustomValue');
export const baseUriValue = Symbol('baseUriValue');
export const valueValue = Symbol('valueValue');
export const customItems = Symbol('customItems');
export const serversValue = Symbol('serversValue');
export const onServersCountChangeValue = Symbol('onServersCountChangeValue');
export const onApiServerChange = Symbol('onApiServerChange');
export const getServerIndexByUri = Symbol('getServerIndexByUri');
export const getSelectionInfo = Symbol('getSelectionInfo');
export const getExtraServers = Symbol('getExtraServers');
export const resetSelection = Symbol('resetSelection');
export const updateServerSelection = Symbol('updateServerSelection');
export const notifyServersCount = Symbol('notifyServersCount');
export const setValue = Symbol('setValue');
export const customUriChangeHandler = Symbol('customUriChangeHandler');
export const selectionChangeHandler = Symbol('selectionChangeHandler');
export const childrenHandler = Symbol('childrenHandler');
export const dropDownOpenedHandler = Symbol('dropDownOpenedHandler');
export const listboxItemsHandler = Symbol('listboxItemsHandler');
export const slotTemplate = Symbol('slotTemplate');
export const selectorTemplate = Symbol('selectorTemplate');
export const selectorListTemplate = Symbol('selectorListTemplate');
export const serverListTemplate = Symbol('serverListTemplate');
export const serverListItemTemplate = Symbol('serverListItemTemplate');
export const customUriTemplate = Symbol('customUriTemplate');
export const customUriInputTemplate = Symbol('customUriInputTemplate');
export const graphChangeHandler = Symbol('graphChangeHandler');
export const queryServers = Symbol('queryServers');

/**
 * An element that renders a selection of servers defined in AMF graph model for an API.
 *
 * This component receives an AMF model, and selected node's id and type
 * to know which servers to render
 *
 * When the selected server changes, it dispatches an `api-server-changed`
 * event, with the following details:
 * - Server value: the server id (for listed servers in the model), the URI
 *    value (when custom base URI is selected), or the value of the `anypoint-item`
 *    component rendered into the extra slot
 * - Selected type: `server` | `custom` | `extra`
 *    - `server`: server from the AMF model
 *    - `custom`: custom base URI input change
 *    - `extra`: extra slot's anypoint-item `value` attribute (see below)
 *
 * Adding extra slot:
 * This component renders a `slot` element to render anything the users wants
 * to add in there. To enable this, sit the `extraOptions` value in this component
 * to true, and render an element associated to the slot name `custom-base-uri`.
 * The items rendered in this slot should be `anypoint-item` components, and have a
 * `value` attribute. This is the value that will be dispatched in the `api-server-changed`
 * event.
 */
export default class ApiServerSelectorElement extends EventsTargetMixin(LitElement) {
  static get properties() {
    return {
      /**
       * The baseUri to override any server definition
       */
      baseUri: { type: String },

      /**
       * When set the `Custom base URI` is rendered in the dropdown
       */
      allowCustom: { type: Boolean, reflect: true },

      /**
       * The current list of servers to render
       */
      servers: { type: Array },

      /**
       * Currently selected type of the input.
       * `server` | `extra` | `custom`
       */
      type: { type: String },

      /**
       * Current value of the server
       */
      value: { type: String },

      /**
       * Enables outlined material theme
       */
      outlined: { type: Boolean },

      /**
       * Enables Anypoint platform styles.
       */
      anypoint: { type: Boolean },

      /**
       * When set it automatically selected the first server from the list
       * of servers when selection is missing.
       */
      autoSelect: { type: Boolean },

      /**
       * A programmatic access to the opened state of the drop down.
       * Note, this does nothing when custom element is rendered.
       */
      opened: { type: Boolean },

      /**
       * The graph domain id of the selected domain object.
       */
      domainId: { type: String },
      /**
       * The selected domain type.
       * This is an abstract name from the api navigation.
       */
      domainType: { type: String },
    };
  }
  
  /**
   * @returns {string} The domain id (AMF id) of the rendered operation.
   */
  get domainId() {
    return this[domainIdValue];
  }

  /**
   * @param {string} value The domain id (AMF id) of the rendered operation.
   */
  set domainId(value) {
    const old = this[domainIdValue];
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this[domainIdValue] = value;
    this.requestUpdate('domainId', old);
    this[processDebounce]();
  }

  /** 
   * @returns {SelectionType|undefined} The domain id of the object to render.
   */
  get domainType() {
    return this[domainTypeValue];
  }

  /** 
   * @returns {SelectionType|undefined} The domain id of the object to render.
   */
  set domainType(value) {
    const old = this[domainTypeValue];
    if (old === value) {
      return;
    }
    this[domainTypeValue] = value;
    this.requestUpdate('domainType', old);
    if (value) {
      this[processDebounce]();
    }
  }

  get styles() {
    return elementStyles;
  }

  /**
   * @return {string[]} Computed list of all URI values from both the servers
   * and the list of rendered custom items.
   */
  get serverValues() {
    const result = (this.servers || []).map(item => item.url);
    return result.concat(this[customItems] || []);
  }

  /**
   * @param {ApiServer[]} value List of servers to set
   */
  set servers(value) {
    const old = this[serversValue];
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this[serversValue] = value;
    this[updateServerSelection](value);
    this.requestUpdate('servers', old);
    this[notifyServersCount]();
  }

  /**
   * @returns {ApiServer[]}
   */
  get servers() {
    return this[serversValue] || [];
  }

  /**
   * @returns {boolean}
   */
  get allowCustom() {
    return this[allowCustomValue];
  }

  /**
   * @param {boolean} value
   */
  set allowCustom(value) {
    const old = this.allowCustom;
    /* istanbul ignore if */
    if (old === value) {
      return;
    }

    this[allowCustomValue] = value;
    this[notifyServersCount]();
    this.requestUpdate('allowCustom', old);
    if (!value && this.isCustom && !this[baseUriValue]) {
      this[resetSelection]();
    }
  }

  get baseUri() {
    return this[baseUriValue];
  }

  set baseUri(value) {
    const old = this[baseUriValue];
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this.type = 'custom';
    this.value = value;
    this[baseUriValue] = value;
    this.requestUpdate('baseUri', old);
  }

  /**
   * @return {String} Current base URI value from either (in order) the baseUri,
   * current value, or just empty string.
   */
  get value() {
    return this.baseUri || this[valueValue] || '';
  }

  /**
   * Sets currently rendered value.
   * If the value is not one of the drop down options then it renders custom control.
   *
   * This can be used to programmatically set a value of the control.
   *
   * @param {String} value The value to render.
   */
  set value(value) {
    if (this.baseUri) {
      return;
    }
    const old = this[valueValue];
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this[valueValue] = value;
    this[setValue](value);
    this.requestUpdate('value', old);
  }

  /**
   * @return {Boolean} True if selected type is "custom" type.
   */
  get isCustom() {
    return this.type === 'custom';
  }

  /**
   * Checks whether the current value is a custom value related to current list of servers.
   * @return {Boolean} True if the value is not one of the server values or custom
   * servers.
   */
  get isValueCustom() {
    const { value } = this;
    if (!value) {
      return false;
    }
    return !this.serverValues.includes(value);
  }

  /**
   * @return {EventListener|null} Previously registered callback function for
   * the `api-server-changed` event.
   */
  get onapiserverchange() {
    return this[onApiServerChange];
  }

  /**
   * @param {EventListener} value A callback function to be called
   * when `api-server-changed` event is dispatched.
   */
  set onapiserverchange(value) {
    const old = this[onApiServerChange];
    if (old) {
      this.removeEventListener(EventTypes.Server.serverChange, old);
    }
    const isFn = typeof value === 'function';
    if (isFn) {
      this[onApiServerChange] = value;
      this.addEventListener(EventTypes.Server.serverChange, value);
    } else {
      this[onApiServerChange] = null;
    }
  }

  /**
   * @return {EventListener|null} Previously registered callback function for
   * the `servers-count-changed` event.
   */
  get onserverscountchange() {
    return this[onServersCountChangeValue] || null;
  }

  /**
   * @param {EventListener} value A callback function to be called
   * when `servers-count-changed` event is dispatched.
   */
  set onserverscountchange(value) {
    const old = this[onServersCountChangeValue];
    if (old) {
      this.removeEventListener(EventTypes.Server.serverCountChange, old);
    }
    const isFn = typeof value === 'function';
    if (isFn) {
      this[onServersCountChangeValue] = value;
      this.addEventListener(EventTypes.Server.serverCountChange, value);
    } else {
      this[onServersCountChangeValue] = null;
    }
  }

  /**
   * @return {Number} Total number of list items being rendered.
   */
  get serversCount() {
    const { allowCustom, servers } = this;
    const offset = allowCustom ? 1 : 0;
    const serversCount = servers.length + this[customNodesCount] + offset;
    return serversCount;
  }

  constructor() {
    super();
    /**
     * Holds the size of rendered custom servers.
     * @type number
     */
    this[customNodesCount] = 0;
    /** 
     * The timeout after which the `queryGraph()` function is called 
     * in the debouncer.
     */
    this.queryDebouncerTimeout = 1;
    this.opened = false;
    this.autoSelect = false;
    this.anypoint = false;
    this.outlined = false;

    /**
     * A list of custom items rendered in the slot.
     * This property is received from the list box that mixes in `AnypointSelectableMixin`
     * that dispatches `items-changed` event when rendered items change.
     * @type {string[]}
     */
    this[customItems] = [];
    /** @type EventListener */
    this[onServersCountChangeValue] = undefined;
    this[graphChangeHandler] = this[graphChangeHandler].bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this[processDebounce]();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this[debounceValue]) {
      clearTimeout(this[debounceValue]);
      this[debounceValue] = undefined;
    }
  }

  /**
   * @param {EventTarget} node
   */
  _attachListeners(node) {
    node.addEventListener(EventTypes.Store.graphChange, this[graphChangeHandler]);
    super._attachListeners(node);
  }

  /**
   * @param {EventTarget} node
   */
  _detachListeners(node) {
    node.removeEventListener(EventTypes.Store.graphChange, this[graphChangeHandler]);
    super._detachListeners(node);
  }

  /**
   * Handler for the event dispatched by the store when the graph model change.
   */
  [graphChangeHandler]() {
    this[processDebounce]()
  }

  /**
   * Calls the `queryGraph()` function in a debouncer.
   */
  [processDebounce]() {
    if (this[debounceValue]) {
      clearTimeout(this[debounceValue]);
    }
    this[debounceValue] = setTimeout(() => {
      this[debounceValue] = undefined;
      this.processGraph();
    }, this.queryDebouncerTimeout);
  }

  firstUpdated() {
    this[notifyServersCount]();
  }

  /**
   * Queries for the current API server data from the store.
   */
  async processGraph() {
    const oldValue = this.value;
    await this[queryServers]();
    // await this.requestUpdate();
    this.value = '';
    this.selectIfNeeded(oldValue);
    this[notifyServersCount]();
  }

  /**
   * Queries for the current servers value.
   */
  async [queryServers]() {
    const { domainId, domainType } = this;
    let endpointId;
    let methodId;
    if (domainType === 'operation') {
      methodId = domainId;
    } else if (domainType === 'resource') {
      endpointId = domainId;
    }
    try {
      const info = await Events.Server.query(this, {
        endpointId,
        methodId,
      });
      this[serversValue] = info;
    } catch (e) {
      this[serversValue] = undefined;
      Events.Telemetry.exception(this, e.message, false);
      Events.Reporting.error(this, e, `Unable to query for API servers: ${e.message}`, this.localName);
    }
  }

  /**
   * Async function to set value after component has finished updating
   * @param {String} value
   * @return {Promise<void>}
   * @private
   */
  async [setValue](value) {
    await this.updateComplete;
    const { type, value: effectiveValue } = this[getSelectionInfo](value);
    if (type === 'custom' && !this.allowCustom) {
      return;
    }
    if (this.type !== type) {
      this.type = type;
    }
    Events.Server.serverChange(this, effectiveValue, this.type);
  }

  /**
   * Dispatches the `servers-count-changed` event with the current number of rendered servers.
   */
  [notifyServersCount]() {
    Events.Server.serverCountChange(this, this.serversCount);
  }

  /**
   * A handler called when slotted number of children change.
   * It sets the `[customNodesCount]` property with the number of properties
   * and notifies the change.
   */
  [childrenHandler]() {
    const nodes = this[getExtraServers]();
    this[customNodesCount] = nodes.length;
    this[notifyServersCount]();
  }

  /**
   * Executes auto selection logic.
   * 
   * @param {string=} preferred The value that should be selected when possible.
   */
  selectIfNeeded(preferred) {
    if (!this.autoSelect) {
      if (preferred) {
        this.value = preferred;
      }
      return;
    }
    if (preferred && this.servers) {
      const has = this.servers.some(i => i.url === preferred) || this[customItems].includes(preferred);
      if (has) {
        this.value = preferred;
        return;
      }
    }
    if (this.value) {
      return;
    }
    if (!this.value && preferred && this.type === 'custom') {
      this.value = preferred;
      return;
    }
    const [first] = this.servers;
    if (first) {
      this.value = first.url;
    } else {
      const [extra] = this[getExtraServers]();
      if (extra) {
        this.type = 'extra';
        this.value = extra.getAttribute('data-value') || extra.getAttribute('value');
      }
    }
  }

  /**
   * Collects information about selection from the current value.
   * @param {string} value Current value for the server URI.
   * @return {SelectionInfo} A selection info object
   */
  [getSelectionInfo](value = '') {
    const { isCustom } = this;
    // Default values.
    const result = {
      type: 'server',
      value,
    };
    if (isCustom) {
      // prohibits closing the custom input.
      result.type = 'custom';
      return result;
    }
    if (!value) {
      // When a value is cleared it is always a server
      return result;
    }
    const values = this.serverValues;
    const index = values.indexOf(value);
    if (index === -1) {
      // this is not a custom value (isCustom would be set)
      // so this is happening when navigation change but the server is not 
      // in the list of selected servers. We return the set value but the 
      // later logic will reset the selection to the first server.
      return result;
    }
    const itemValue = values[index];
    const custom = this[customItems] || [];
    const isSlotted = custom.indexOf(itemValue) !== -1;
    if (isSlotted) {
      result.type = 'extra';
    } else {
      result.type = 'server';
    }
    return result;
  }

  /**
   * Takes care of recognizing whether a server selection should be cleared.
   * This happens when list of servers change and with the new list of server
   * current selection does not exist.
   * This ignores the selection when current type is not a `server`.
   *
   * @param {ApiServer[]} servers List of new servers
   */
  [updateServerSelection](servers) {
    if (!servers) {
      this[resetSelection]();
    }
    if (!servers || this.type !== 'server') {
      return;
    }
    const index = this[getServerIndexByUri](servers, this.value);
    if (index === -1) {
      this[resetSelection]();
    }
  }

  /**
   * @param {ApiServer[]} servers List of current servers
   * @param {string} value The value to look for
   * @return {number} The index of found server or -1 if none found.
   */
  [getServerIndexByUri](servers, value) {
    return servers.findIndex(s => s.url === value);
  }

  /**
   * Handler for the listbox's change event
   * @param {CustomEvent} e
   */
  [selectionChangeHandler](e) {
    const { selectedItem } = /** @type {any} */ (e.target);
    if (!selectedItem) {
      return;
    }
    let value = selectedItem.getAttribute('data-value') || selectedItem.getAttribute('value');
    if (value === 'custom') {
      this.type = 'custom';
      value = '';
    }
    this.value = value;
  }

  /**
   * Retrieves custom base uris elements assigned to the
   * custom-base-uri slot
   *
   * @return {Array<Element>} Elements assigned to custom-base-uri slot
   */
  [getExtraServers]() {
    const slot = this.shadowRoot.querySelector('slot');
    const items = slot ? ( /** @type HTMLSlotElement */ (slot)).assignedElements({ flatten: true }) : [];
    return items.filter((elm) => elm.hasAttribute('value') || elm.hasAttribute('data-value'));
  }

  /**
   * Handler for the input field change.
   * @param {Event} e
   */
  [customUriChangeHandler](e) {
    const { value } = /** @type HTMLInputElement */ (e.target);
    this.value = value;
  }

  /**
   * Resets current selection to a default value.
   */
  [resetSelection]() {
    this.value = '';
    this.type = 'server';
    this.selectIfNeeded();
  }

  /**
   * Handler for the drop down's `opened-changed` event. It sets local value
   * for the opened flag.
   * @param {Event} e
   */
  [dropDownOpenedHandler](e) {
    this.opened = /** @type AnypointDropdownElement */ (e.target).opened;
  }

  /**
   * Updates list of custom items rendered in the selector.
   * @param {Event} e
   */
  [listboxItemsHandler](e) {
    const value = /** @type AnypointListboxElement */ (e.target).items;
    if (!Array.isArray(value) || !value.length) {
      this[customItems] = [];
      return;
    }
    const result = [];
    value.forEach((node) => {
      const slot = node.getAttribute('slot');
      if (slot !== 'custom-base-uri') {
        return;
      }
      const v = node.getAttribute('data-value') || node.getAttribute('value');
      if (!v) {
        return;
      }
      result.push(v);
    });
    this[customItems] = result;
  }

  render() {
    const { styles, isCustom } = this;
    return html`
    <style>${styles}</style>
    ${isCustom ? this[customUriInputTemplate]() : this[selectorTemplate]()}
    `;
  }

  /**
   * @return {TemplateResult} Template result for the custom input.
   */
  [customUriInputTemplate]() {
    const { anypoint, outlined, value } = this;
    return html`
    <anypoint-input
      class="uri-input"
      @input="${this[customUriChangeHandler]}"
      .value="${value}"
      ?anypoint="${anypoint}"
      ?outlined="${outlined}"
    >
      <label slot="label">API base URI</label>
      <anypoint-icon-button
        aria-label="Activate to clear and close custom editor"
        title="Clear and close custom editor"
        slot="suffix"
        @click="${this[resetSelection]}"
        ?anypoint="${anypoint}"
      >
        <span class="icon">${close}</span>
      </anypoint-icon-button>
  </anypoint-input>`;
  }

  /**
   * @return {TemplateResult} Template result for the drop down element.
   */
  [selectorTemplate]() {
    const { anypoint, outlined, value, opened } = this;
    return html`
    <anypoint-dropdown-menu
      class="api-server-dropdown"
      ?anypoint="${anypoint}"
      ?outlined="${outlined}"
      .opened="${opened}"
      fitPositionTarget
      @openedchange="${this[dropDownOpenedHandler]}"
    >
      <label slot="label">Select server</label>
      <anypoint-listbox
        .selected="${value}"
        slot="dropdown-content"
        tabindex="-1"
        attrforselected="data-value"
        selectable="[value],[data-value]"
        ?anypoint="${anypoint}"
        @selectedchange="${this[selectionChangeHandler]}"
        @itemschange="${this[listboxItemsHandler]}"
      >
        ${this[selectorListTemplate]()}
      </anypoint-listbox>
    </anypoint-dropdown-menu>`;
  }

  /**
   * Call the render functions for
   * - Server options (from AMF Model)
   * - Custom URI option
   * - Extra slot
   * @return {TemplateResult} The combination of all options
   */
  [selectorListTemplate]() {
    return html`
      ${this[serverListTemplate]()}
      ${this[slotTemplate]()}
      ${this[customUriTemplate]()}
    `;
  }

  /**
   * @return {TemplateResult|string} The template for the custom URI list item.
   */
  [customUriTemplate]() {
    const { allowCustom, anypoint } = this;
    if (!allowCustom) {
      return '';
    }
    return html`<anypoint-item
      class="custom-option"
      data-value="custom"
      ?anypoint="${anypoint}"
    >Custom base URI</anypoint-item>`;
  }

  /**
   * @return {TemplateResult[]|string} Template result for the drop down list
   * options for current servers
   */
  [serverListTemplate]() {
    const { servers } = this;
    if (!Array.isArray(servers)) {
      return '';
    }
    return servers.map(server => this[serverListItemTemplate](server));
  }

  /**
   * @param {ApiServer} server The server definition
   * @returns {TemplateResult} The template for a server list item.
   */
  [serverListItemTemplate](server) {
    const { anypoint } = this;
    return html`
    <anypoint-item
      data-value="${server.url}"
      ?anypoint="${anypoint}"
      data-item="server-dropdown-option"
    >
      ${server.url}
    </anypoint-item>
    `
  }

  /**
   * @return {TemplateResult} Template result for the `slot` element
   */
  [slotTemplate]() {
    return html`<slot
      @slotchange="${this[childrenHandler]}"
      name="custom-base-uri"
    ></slot>`;
  }
}
