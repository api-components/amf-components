/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
import { LitElement, html } from 'lit-element';
import { EventsTargetMixin } from '@anypoint-web-components/awc';
import { styleMap } from 'lit-html/directives/style-map.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { HttpStyles } from '@advanced-rest-client/base/api.js';
import '@anypoint-web-components/awc/anypoint-icon-button.js';
import '@anypoint-web-components/awc/anypoint-collapse.js';
import '@advanced-rest-client/icons/arc-icon.js';
import navStyles from './styles/NavStyles.js';
import { ns } from '../helpers/Namespace.js';
import { ApiSorting } from '../lib/navigation-layout/ApiSorting.js';
import { EndpointsTree } from '../lib/navigation-layout/EndpointsTree.js';
import { NaturalTree } from '../lib/navigation-layout/NaturalTree.js';
import { EventTypes } from '../events/EventTypes.js';
import { Events } from '../events/Events.js';
import { cancelEvent } from '../lib/Utils.js'

/** @typedef {import('lit-html').TemplateResult} TemplateResult */
/** @typedef {import('@anypoint-web-components/awc').AnypointCollapseElement} AnypointCollapseElement */
/** @typedef {import('../helpers/api').ApiEndPoint} ApiEndPoint */
/** @typedef {import('../helpers/api').ApiOperation} ApiOperation */
/** @typedef {import('../helpers/api').ApiDocumentation} ApiDocumentation */
/** @typedef {import('../helpers/api').ApiNodeShape} ApiNodeShape */
/** @typedef {import('../helpers/api').ApiCustomDomainProperty} ApiCustomDomainProperty */
/** @typedef {import('../types').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */
/** @typedef {import('../types').EndpointItem} EndpointItem */
/** @typedef {import('../types').OperationItem} OperationItem */
/** @typedef {import('../types').DocumentationItem} DocumentationItem */
/** @typedef {import('../types').NodeShapeItem} NodeShapeItem */
/** @typedef {import('../types').SecurityItem} SecurityItem */
/** @typedef {import('../types').SelectableMenuItem} SelectableMenuItem */
/** @typedef {import('../types').EditableMenuItem} EditableMenuItem */
/** @typedef {import('../types').SchemaAddType} SchemaAddType */
/** @typedef {import('../types').SelectionType} SelectionType */
/** @typedef {import('../types').DocumentMeta} DocumentMeta */
/** @typedef {import('../types').NavigationLayout} NavigationLayout */

export const queryingValue = Symbol('queryingValue');
export const abortControllerValue = Symbol('abortControllerValue');
export const domainIdValue = Symbol('domainIdValue');
export const domainTypeValue = Symbol('domainTypeValue');
export const endpointsExpandedValue = Symbol('endpointsExpandedValue');
export const documentationsValue = Symbol('documentationsValue');
export const schemasValue = Symbol('schemasValue');
export const securityValue = Symbol('securityValue');
export const sourceEndpointsValue = Symbol('sourceEndpointsValue');
export const endpointsValue = Symbol('endpointsValue');
export const openedEndpointsValue = Symbol('openedEndpointsValue');
export const layoutValue = Symbol('layoutValue');
export const queryValue = Symbol('queryValue');
export const queryApi = Symbol('queryApi');
export const queryEndpoints = Symbol('queryEndpoints');
export const layoutEndpoints = Symbol('processEndpoints');
export const queryDocumentations = Symbol('queryDocumentations');
export const querySchemas = Symbol('querySchemas');
export const querySecurity = Symbol('querySecurity');
export const createFlatTreeItems = Symbol('createFlatTreeItems');
export const getFilteredEndpoints = Symbol('getFilteredEndpoints');
export const getFilteredDocumentations = Symbol('getFilteredDocumentations');
export const getFilteredSchemas = Symbol('getFilteredSchemas');
export const getFilteredSecurity = Symbol('getFilteredSecurity');
export const computeEndpointPaddingValue = Symbol('computeEndpointPadding');
export const computeEndpointPaddingLeft = Symbol('computeEndpointPaddingLeft');
export const computeOperationPaddingValue = Symbol('computeOperationPaddingValue');
export const computeOperationPaddingLeft = Symbol('computeOperationPaddingLeft');
export const itemClickHandler = Symbol('itemClickHandler');
export const toggleSectionClickHandler = Symbol('toggleSectionClickHandler');
export const toggleSectionKeydownHandler = Symbol('toggleSectionKeydownHandler');
export const endpointToggleClickHandler = Symbol('endpointToggleClickHandler');
export const focusHandler = Symbol('focusHandler');
export const keydownHandler = Symbol('keydownHandler');
export const summaryTemplate = Symbol('summaryTemplate');
export const endpointsTemplate = Symbol('endpointsTemplate');
export const endpointTemplate = Symbol('endpointTemplate');
export const endpointToggleTemplate = Symbol('endpointToggleTemplate');
export const operationItemTemplate = Symbol('operationItemTemplate');
export const documentationsTemplate = Symbol('documentationsTemplate');
export const documentationTemplate = Symbol('documentationTemplate');
export const externalDocumentationTemplate = Symbol('externalDocumentationTemplate');
export const schemasTemplate = Symbol('schemasTemplate');
export const schemaTemplate = Symbol('schemaTemplate');
export const securitiesTemplate = Symbol('securitiesTemplate');
export const securityTemplate = Symbol('securityTemplate');
export const keyDownAction = Symbol('keyDownAction');
export const keyUpAction = Symbol('keyUpAction');
export const keyShiftTabAction = Symbol('keyShiftTabAction');
export const keyEscAction = Symbol('keyEscAction');
export const keySpaceAction = Symbol('keySpaceAction');
export const shiftTabPressedValue = Symbol('shiftTabPressedValue');
export const focusedItemValue = Symbol('focusedItemValue');
export const selectedItemValue = Symbol('selectedItemValue');
export const focusItem = Symbol('focusItem');
export const listActiveItems = Symbol('listActiveItems');
export const itemsValue = Symbol('itemsValue');
export const listSectionActiveNodes = Symbol('listSectionActiveNodes');
export const keyArrowRightAction = Symbol('keyArrowRightAction');
export const keyArrowLeftAction = Symbol('keyArrowLeftAction');
export const makeSelection = Symbol('makeSelection');
export const selectItem = Symbol('selectItem');
export const deselectItem = Symbol('deselectItem');
export const findSelectable = Symbol('findSelectable');
export const toggleSectionElement = Symbol('toggleSectionElement');
export const summarySelected = Symbol('summarySelected');
export const filterTemplate = Symbol('filterTemplate');
export const processQuery = Symbol('processQuery');
export const searchHandler = Symbol('searchHandler');
export const resetTabindices = Symbol('resetTabindices');
export const notifyNavigation = Symbol('notifyNavigation');
export const addingEndpointValue = Symbol('addingEndpointValue');
export const addEndpointInputTemplate = Symbol('addEndpointInputTemplate');
export const addEndpointKeydownHandler = Symbol('addEndpointKeydownHandler');
export const commitNewEndpoint = Symbol('commitNewEndpoint');
export const cancelNewEndpoint = Symbol('cancelNewEndpoint');
export const findViewModelItem = Symbol('findViewModelItem');
export const renameInputTemplate = Symbol('renameInputTemplate');
export const renameKeydownHandler = Symbol('renameKeydownHandler');
export const renameBlurHandler = Symbol('renameBlurHandler');
export const updateNameHandler = Symbol('updateNameHandler');
export const addDocumentationInputTemplate = Symbol('addDocumentationInputTemplate');
export const addDocumentationKeydownHandler = Symbol('addDocumentationKeydownHandler');
export const addingDocumentationValue = Symbol('addingDocumentationValue');
export const addingExternalValue = Symbol('addingExternalValue');
export const commitNewDocumentation = Symbol('commitNewDocumentation');
export const externalDocumentationHandler = Symbol('externalDocumentationHandler');
export const addingSchemaValue = Symbol('addingSchemaValue');
export const addSchemaInputTemplate = Symbol('addSchemaInputTemplate');
export const addSchemaKeydownHandler = Symbol('addSchemaKeydownHandler');
export const commitNewSchema = Symbol('commitNewSchema');
export const addingSchemaTypeValue = Symbol('addingSchemaTypeValue');
export const graphChangeHandler = Symbol('graphChangeHandler');
export const documentMetaValue = Symbol('documentMetaValue');

export default class ApiNavigationElement extends EventsTargetMixin(LitElement) {
  static get styles() {
    return [navStyles, HttpStyles.default];
  }

  /** 
   * @returns {boolean} When true then the element is currently querying for the graph data.
   */
  get querying() {
    return this[queryingValue] || false;
  }

  /**
   * @returns {AbortController|undefined} Set only when `querying`. Use to abort the query operation.
   * When calling `abort` on the controller the element stops querying and processing the graph data.
   * All data that already has been processed are not cleared.
   */
  get abortController() {
    return this[abortControllerValue];
  }

  /** 
   * @returns {string|undefined} The current selection domain id.
   */
  get domainId() {
    return this[domainIdValue];
  }

  /** 
   * @returns {string|undefined} The domain id that is currently being selected.
   */
  set domainId(value) {
    const old = this[domainIdValue];
    if (old === value) {
      return;
    }
    this[domainIdValue] = value;
    this.requestUpdate('domainId', old);
    this.select(value);
  }

  /**
   * @returns {SelectionType}Type of the selected domain item.
   */
  get domainType() {
    return this[domainTypeValue];
  }

  /**
   * @return {Boolean} true when `_docs` property is set with values
   */
  get hasDocs() {
    const docs = this[documentationsValue];
    return Array.isArray(docs) && !!docs.length;
  }

  /**
   * @return {Boolean} true when has schemas definitions
   */
  get hasSchemas() {
    const items = this[schemasValue];
    return Array.isArray(items) && !!items.length;
  }

  /**
   * @return {Boolean} true when `_security` property is set with values
   */
  get hasSecurity() {
    const items = this[securityValue];
    return Array.isArray(items) && !!items.length;
  }

  /**
   * @return {Boolean} true when `_endpoints` property is set with values
   */
  get hasEndpoints() {
    const items = this[endpointsValue];
    return Array.isArray(items) && !!items.length;
  }

  /**
   * @return {HTMLElement=} A reference to currently selected element.
   */
  get selectedItem() {
    return this[selectedItemValue];
  }

  /**
   * @return {HTMLElement=} The currently focused item.
   */
  get focusedItem() {
    return this[focusedItemValue];
  }

  get query() {
    return this[queryValue];
  }

  set query(value) {
    const old = this[queryValue];
    if (old === value) {
      return;
    }
    this[queryValue] = value;
    this[processQuery](value);
    this.requestUpdate('query', old);
  }

  /** @type DocumentMeta */
  get documentMeta() {
    return this[documentMetaValue];
  }

  /** @returns {NavigationLayout} */
  get layout() {
    return this[layoutValue];
  }

  /** @param {NavigationLayout} value */
  set layout(value) {
    const old = this[layoutValue];
    if (old === value) {
      return;
    }
    this[layoutValue] = value;
    this[layoutEndpoints]();
    this.requestUpdate('layout', old);
  }

  /** @returns {boolean} */
  get endpointsExpanded() {
    if (typeof this[endpointsExpandedValue] !== 'boolean') {
      return false;
    }
    return this[endpointsExpandedValue];
  }

  /** @param {boolean} value */
  set endpointsExpanded(value) {
    const old = this[endpointsExpandedValue];
    if (old === value) {
      return;
    }
    this[endpointsExpandedValue] = value;
    if (value) {
      this.expandAllEndpoints();
    } else {
      this.collapseAllEndpoints();
    }
  }

  /**
   * @return {boolean} True when the summary entry is rendered.
   * Summary should be rendered only when `summary` is set and current model is not a RAML fragment.
   */
  get summaryRendered() {
    const { summary, documentMeta } = this;
    if (!summary || !documentMeta) {
      return false;
    }
    const { isFragment, isLibrary } = documentMeta;
    return !isFragment && !isLibrary;
  }

  static get properties() {
    return {
      /** 
       * When this property change the element queries the graph store for the data model.
       * It can be skipped when the application calls the `queryGraph()` method imperatively.
       */
      apiId: { type: String, reflect: true, },
      /**
       * A model `@id` of selected documentation part.
       * Special case is for `summary` view. It's not part of an API
       * but most applications has some kins of summary view for the
       * API.
       */
      domainId: { type: String, reflect: true },
      /**
        * If set it renders `API summary` menu option.
        * It will allow to set `domainId` and `domainType` to `summary`
        * when this option is set.
        */
      summary: { type: Boolean, reflect: true },
      /**
        * A label for the `summary` section.
        */
      summaryLabel: { type: String, reflect: true },
      /**
       * Determines and changes state of documentation panel.
       */
      documentationsOpened: { type: Boolean, reflect: true },
      /**
       * Determines and changes state of schemas (types) panel.
       */
      schemasOpened: { type: Boolean, reflect: true },
      /**
       * Determines and changes state of security panel.
       */
      securityOpened: { type: Boolean, reflect: true },
      /**
       * Determines and changes state of endpoints panel.
       */
      endpointsOpened: { type: Boolean, reflect: true },
      /**
       * Filters list elements by this value when set.
       * Clear the value to reset the search.
       *
       * This is not currently exposed in element's UI due
       * to complexity of search and performance.
       */
      query: { type: String },
      /**
       * Size of endpoint indentation for nested resources.
       * In pixels.
       *
       * The attribute name for this property is `indent-size`. Note, that this
       * will change to web consistent name `indentSize` in the future.
       */
      indentSize: { type: Number, reflect: true, },
      /** 
       * By default the endpoints are rendered one-by-one as defined in the API spec file
       * without any tree structure. When this option is set it sorts the endpoints 
       * alphabetically and creates a tree structure for the endpoints.
       * 
       * - tree - creates a tree structure from the endpoints list
       * - natural - behavior consistent with the previous version of the navigation. Creates a tree structure based on the previous endpoints.
       * - natural-sort - as `natural` but endpoints are sorted by name.
       * - off (or none) - just like in the API spec.
       * 
       * Note, the resulted tree structure will likely be different to the one encoded 
       * in the API spec file.
       */
      layout: { type: String, reflect: true, },
      /** 
       * When set it renders an input to filter the menu items.
       */
      filter: { type: Boolean, reflect: true, },
      /** 
       * When set the element won't query the store when attached to the DOM.
       * Instead set the `apiId` property or directly call the `queryGraph()` function.
       */
      manualQuery: { type: Boolean, reflect: true, },
      /** 
       * When set it enables graph items editing functionality.
       * The user can double-click on a menu item and edit its name.
       */
      edit: { type: Boolean, reflect: true, },
      /** 
       * When set it expands or opens all endpoints and makes all operations visible.
       * Note, the user can toggle an endpoint anyway so this property does not mean
       * that all endpoints are expanded. When it's true then it means that all endpoints
       * was expanded at some point in time.
       */
      endpointsExpanded: { type: Boolean, reflect: true, },
    };
  }

  constructor() {
    super();
    this.summaryLabel = 'Summary';
    this.summary = false;
    this.anypoint = false;
    this.indentSize = 8;
    this.endpointsOpened = false;
    this.documentationsOpened = false;
    this.schemasOpened = false;
    this.securityOpened = false;
    this.filter = false;
    this.edit = false;
    this.manualQuery = false;

    /** 
     * @type {EndpointItem[]}
     */
    this[endpointsValue] = undefined;
    /** 
     * @type {DocumentationItem[]}
     */
    this[documentationsValue] = undefined;
    /** 
     * @type {NodeShapeItem[]}
     */
    this[schemasValue] = undefined;
    /** 
     * @type {SecurityItem[]}
     */
    this[securityValue] = undefined;
    /** 
     * The processed and final query term for the list items.
     * @type {string}
     */
    this[queryValue] = undefined;
    /** 
     * Holds a list of ids of currently opened endpoints.
     * @type {string[]}
     */
    this[openedEndpointsValue] = [];
    /** 
     * Cached list of all list elements
     * @type {HTMLElement[]}
     */
    this[itemsValue] = undefined;
    /** @type DocumentMeta */
    this[documentMetaValue] = undefined;

    this[focusHandler] = this[focusHandler].bind(this);
    this[keydownHandler] = this[keydownHandler].bind(this);
    this[graphChangeHandler] = this[graphChangeHandler].bind(this);
  }

  /**
   * Ensures aria role attribute is in place.
   * Attaches element's listeners.
   */
  connectedCallback() {
    super.connectedCallback();
    if (!this.getAttribute('aria-label')) {
      this.setAttribute('aria-label', 'API navigation');
    }
    if (!this.getAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    this.addEventListener('focus', this[focusHandler]);
    this.addEventListener('keydown', this[keydownHandler]);
    if (!this.manualQuery) {
      this.queryGraph();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('focus', this[focusHandler]);
    this.removeEventListener('keydown', this[keydownHandler]);
    this[itemsValue] = undefined;
  }

  /**
   * @param {EventTarget} node
   */
  _attachListeners(node) {
    super._attachListeners(node);
    node.addEventListener(EventTypes.Store.graphChange, this[graphChangeHandler]);
  }

  /**
   * @param {EventTarget} node
   */
  _detachListeners(node) {
    super._detachListeners(node);
    node.removeEventListener(EventTypes.Store.graphChange, this[graphChangeHandler]);
  }

  /**
   * Handler for the event dispatched by the store when the graph model change.
   */
  [graphChangeHandler]() {
    this.queryGraph();
  }

  /**
   * Queries for the API data from the graph store.
   */
  async queryGraph() {
    if (this.querying) {
      return;
    }
    this[queryingValue] = true;
    this[itemsValue] = undefined;
    const ctrl = new AbortController();
    this[abortControllerValue] = ctrl;
    await this[queryApi](ctrl.signal);
    await this[queryEndpoints](ctrl.signal);
    await this[queryDocumentations](ctrl.signal);
    await this[querySchemas](ctrl.signal);
    await this[querySecurity](ctrl.signal);
    if (!ctrl.signal.aborted) {
      this[layoutEndpoints]();
    }
    this[queryingValue] = false;
    this[abortControllerValue] = undefined;
    this[openedEndpointsValue] = [];
    await this.requestUpdate();
    this[resetTabindices]();
    this.dispatchEvent(new Event('graphload'));
  }

  /**
   * Queries for the current API base info.
   * @param {AbortSignal} signal
   */
  async [queryApi](signal) {
    this[documentMetaValue] = undefined;
    try {
      const info = await Events.Api.documentMeta(this);
      if (signal.aborted) {
        return;
      }
      this[documentMetaValue] = info;
    } catch (e) {
      Events.Telemetry.exception(this, e.message, false);
      Events.Reporting.error(this, e, `Enable to query for API data: ${e.message}`, this.localName);
    }
  }

  /**
   * Queries and sets endpoints data
   * @param {AbortSignal} signal
   */
  async [queryEndpoints](signal) {
    if (signal.aborted) {
      return;
    }
    try {
      const result = await Events.Endpoint.list(this);
      if (signal.aborted) {
        return;
      }
      if (!result) {
        return;
      }
      this[sourceEndpointsValue] = result;
    } catch (e) {
      this[sourceEndpointsValue] = undefined;
      Events.Telemetry.exception(this, e.message, false);
      Events.Reporting.error(this, e, `Enable to query for Endpoints data: ${e.message}`, this.localName);
    }
  }

  /**
   * Queries and sets documentations data
   * @param {AbortSignal} signal
   */
  async [queryDocumentations](signal) {
    this[documentationsValue] = undefined;
    if (signal.aborted) {
      return;
    }
    try {
      const result = await Events.Documentation.list(this);
      if (signal.aborted) {
        return;
      }
      this[documentationsValue] = result;
    } catch (e) {
      Events.Telemetry.exception(this, e.message, false);
      Events.Reporting.error(this, e, `Enable to query for Documents data: ${e.message}`, this.localName);
    }
  }

  /**
   * Queries and sets types (schemas) data
   * @param {AbortSignal} signal
   */
  async [querySchemas](signal) {
    this[schemasValue] = undefined;
    if (signal.aborted) {
      return;
    }
    try {
      const result = await Events.Type.list(this);
      if (signal.aborted) {
        return;
      }
      this[schemasValue] = result;
    } catch (e) {
      Events.Telemetry.exception(this, e.message, false);
      Events.Reporting.error(this, e, `Enable to query for Schemas data: ${e.message}`, this.localName);
    }
  }

  /**
   * Queries and sets security data
   * @param {AbortSignal} signal
   */
  async [querySecurity](signal) {
    this[securityValue] = undefined;
    if (signal.aborted) {
      return;
    }
    try {
      const result = await Events.Security.list(this);
      if (signal.aborted) {
        return;
      }
      this[securityValue] = result;
    } catch (e) {
      Events.Telemetry.exception(this, e.message, false);
      Events.Reporting.error(this, e, `Enable to query for Security data: ${e.message}`, this.localName);
    }
  }

  /**
   * @param {ApiEndPointWithOperationsListItem[]} items
   * @returns {EndpointItem[]} 
   */
  [createFlatTreeItems](items) {
    if (!Array.isArray(items) || !items.length) {
      return [];
    }
    return items.map((endpoint) => ({
      ...endpoint,
      indent: 0,
      label: endpoint.name || endpoint.path,
      selected: false,
      secondarySelected: false,
    }));
  }

  /**
   * Processes endpoints layout for the given configuration.
   */
  [layoutEndpoints]() {
    const { layout } = this;
    const endpoints = this[sourceEndpointsValue];
    if (!endpoints) {
      this[endpointsValue] = undefined;
      return;
    }
    if (layout === 'tree') {
      const sorted = ApiSorting.sortEndpointsByPath([...endpoints]);
      const items = new EndpointsTree().create(sorted);
      this[endpointsValue] = items;
      return;
    }
    if (layout === 'natural') {
      this[endpointsValue] = new NaturalTree().create(endpoints);
      return;
    }
    if (layout === 'natural-sort') {
      const sorted = /** @type ApiEndPointWithOperationsListItem[] */ (ApiSorting.sortEndpointsByPath([...endpoints]));
      this[endpointsValue] = new NaturalTree().create(sorted);
      return;
    }
    //
    // Default layout
    //
    this[endpointsValue] = this[createFlatTreeItems](endpoints);
  }

  /**
   * Filters the current endpoints by the current query value.
   * @returns {EndpointItem[]|undefined} 
   */
  [getFilteredEndpoints]() {
    const value = this[endpointsValue];
    if (!value || !value.length) {
      return undefined;
    }
    const q = this[queryValue];
    if (!q) {
      return value;
    }
    const result = [];
    value.forEach((endpoint) => {
      const { path, label, operations=[] } = endpoint;
      const lPath = path.toLowerCase();
      const lLabel = label.toLowerCase();
      // If the endpoint's path or label matches the query include whole item
      if (lPath.includes(q) || lLabel.includes(q)) {
        result[result.length] = endpoint;
        return;
      }
      // otherwise check all operations and only include matched operations. If none match
      // then do not include the endpoint.
      const ops = operations.filter((op) => op.method.toLowerCase().includes(q) || (op.name || '').toLowerCase().includes(q));
      if (ops.length) {
        const copy = { ...endpoint };
        copy.operations = ops;
        result[result.length] = copy;
      }
    });
    return result;
  }

  /**
   * Computes `style` attribute value for endpoint item.
   * It sets padding-left property to indent resources.
   * See https://github.com/mulesoft/api-console/issues/571.
   *
   * @param {number} indent The computed indentation of the item.
   * @return {string} The value for the left padding of the endpoint menu item.
   */
  [computeEndpointPaddingValue](indent=0) {
    const padding = this[computeEndpointPaddingLeft]();
    if (indent < 1) {
      return `${padding}px`;
    }
    const result = indent * this.indentSize + padding;
    return `${result}px`;
  }

  /**
   * Computes endpoint list item left padding from CSS variables.
   * @return {number}
   */
  [computeEndpointPaddingLeft]() {
    const prop = '--api-navigation-list-item-padding';
    const defaultPadding = 16;
    const padding = getComputedStyle(this).getPropertyValue(prop);
    if (!padding) {
      return defaultPadding;
    }
    const parts = padding.split(' ');
    let paddingLeftValue;
    switch (parts.length) {
      case 1:
        paddingLeftValue = parts[0];
        break;
      case 2:
        paddingLeftValue = parts[1];
        break;
      case 3:
        paddingLeftValue = parts[1];
        break;
      case 4:
        paddingLeftValue = parts[3];
        break;
      default:
        return defaultPadding;
    }
    if (!paddingLeftValue) {
      return defaultPadding;
    }
    paddingLeftValue = paddingLeftValue.replace('px', '').trim();
    const result = Number(paddingLeftValue);
    if (Number.isNaN(result)) {
      return defaultPadding;
    }
    return result;
  }

  /**
   * Computes `style` attribute value for an operation item.
   * It sets padding-left property to indent operations relative to a resource.
   *
   * @param {number} indent The computed indentation of the parent resource.
   * @return {string} The value for the left padding of the endpoint menu item.
   */
  [computeOperationPaddingValue](indent=0) {
    const endpointAdjustment = 32;
    const padding = this[computeOperationPaddingLeft]() + endpointAdjustment;
    const { indentSize } = this;
    if (indentSize < 1) {
      return `${padding}px`;
    }
    const result = indent * indentSize + padding;
    return `${result}px`;
  }

  /**
   * Computes operation list item left padding from CSS variables.
   * @return {number}
   */
  [computeOperationPaddingLeft]() {
    const prop = '--api-navigation-operation-item-padding-left';
    let paddingLeft = getComputedStyle(this).getPropertyValue(prop);
    const defaultPadding = 24;
    if (!paddingLeft) {
      return defaultPadding;
    }
    paddingLeft = paddingLeft.replace('px', '').trim();
    const result = Number(paddingLeft);
    if (Number.isNaN(result)) {
      return defaultPadding;
    }
    return result;
  }

  /**
   * A handler for the click event on a menu list item.
   * Makes a selection from the target.
   * @param {MouseEvent} e
   */
  [itemClickHandler](e) {
    const node = /** @type HTMLElement */ (e.currentTarget);
    const { graphId, graphShape } = node.dataset;
    if (graphId && graphShape) {
      this[makeSelection](graphId, /** @type SelectionType */ (graphShape));
    } else {
      // this is probably the abstract endpoint from the EndpointTree class.
      // We are preventing default so the element can ignore focusing on the item.
      e.preventDefault();
      e.stopPropagation();
    }
  }

  /**
   * A handler for the click event on endpoints toggle button.
   * @param {MouseEvent} e
   */
  [endpointToggleClickHandler](e) {
    const node = /** @type HTMLElement */ (e.currentTarget);
    const { graphId } = node.dataset;
    if (graphId) {
      this.toggleEndpoint(graphId);
      e.stopPropagation();
      e.preventDefault();
      Events.Telemetry.event(this, {
        category: 'API navigation',
        action: 'Toggle endpoint',
      });
    }
  }

  /**
   * Toggles operations visibility for an endpoint.
   * @param {string} graphId The Endpoint graph id.
   */
  toggleEndpoint(graphId) {
    const index = this[openedEndpointsValue].indexOf(graphId);
    if (index === -1) {
      this[openedEndpointsValue].push(graphId);
    } else {
      this[openedEndpointsValue].splice(index, 1);
    }
    this.requestUpdate();
  }

  /**
   * A handler for the click event on a section item. Toggles the clicked section.
   * @param {MouseEvent} e
   */
  [toggleSectionClickHandler](e) {
    const node = /** @type HTMLElement */ (e.currentTarget);
    this[toggleSectionElement](node);
    Events.Telemetry.event(this, {
      category: 'API navigation',
      action: 'Toggle section',
      label: node.dataset.section,
    });
  }

  /**
   * Toggles a section of the menu represented by the element (section list item).
   * @param {HTMLElement} element
   */
  [toggleSectionElement](element) {
    const { property } = element.dataset;
    if (!property) {
      return;
    }
    this[property] = !this[property];
  }

  /**
   * @returns {DocumentationItem[]} List of documentation items filtered by the current query.
   */
  [getFilteredDocumentations]() {
    const items = this[documentationsValue];
    if (!Array.isArray(items) || !items.length) {
      return [];
    }
    const q = this[queryValue];
    if (!q) {
      return items;
    }
    return items.filter((doc) => 
      (doc.title || '').toLocaleLowerCase().includes(q));
  }

  /**
   * @return {NodeShapeItem[]} List of schemas items filtered by the current query.
   */
  [getFilteredSchemas]() {
    const items = this[schemasValue];
    if (!Array.isArray(items) || !items.length) {
      return [];
    }
    const q = this[queryValue];
    if (!q) {
      return items;
    }
    return items.filter((doc) => 
      (doc.name || '').toLocaleLowerCase().includes(q) || 
      (doc.displayName || '').toLocaleLowerCase().includes(q));
  }

  /**
   * @return {SecurityItem[]} List of security items filtered by the current query.
   */
  [getFilteredSecurity]() {
    const items = this[securityValue];
    if (!Array.isArray(items) || !items.length) {
      return [];
    }
    const q = this[queryValue];
    if (!q) {
      return items;
    }
    return items.filter((doc) => 
      (doc.name || '').toLocaleLowerCase().includes(q) || 
      (doc.displayName || '').toLocaleLowerCase().includes(q) || 
      (doc.type || '').toLocaleLowerCase().includes(q));
  }

  /**
   * A handler for the focus event on this element.
   * @param {FocusEvent} e
   */
  [focusHandler](e) {
    if (this[shiftTabPressedValue]) {
      // do not focus the menu itself
      return;
    }
    const path = e.composedPath();
    const rootTarget = /** @type HTMLElement */ (path[0]);
    if (rootTarget !== this && typeof rootTarget.tabIndex !== 'undefined' && !this.contains(rootTarget)) {
      return;
    }
    this[focusedItemValue] = null;
    const { selectedItem } = this;
    if (selectedItem) {
      this[focusItem](selectedItem);
    } else {
      this.focusNext();
    }
  }

  /**
   * Sets a list item focused
   * @param {HTMLElement} item
   */
  [focusItem](item) {
    const old = this[focusedItemValue];
    this[focusedItemValue] = item;
    if (old) {
      old.setAttribute('tabindex', '-1');
    }
    if (item && !item.hasAttribute('disabled')) {
      item.setAttribute('tabindex', '0');
      item.focus();
    }
  }

  /**
   * Handler for the keydown event.
   * @param {KeyboardEvent} e
   */
  [keydownHandler](e) {
    const path = e.composedPath();
    const target = /** @type HTMLElement */ (path[0]);
    if (target.localName === 'input') {
      return;
    }
    if (e.key === 'ArrowDown') {
      this[keyDownAction](e);
    } else if (e.key === 'ArrowUp') {
      this[keyUpAction](e);
    } else if (e.key === 'Tab' && e.shiftKey) {
      this[keyShiftTabAction]();
    } else if (e.key === 'Escape') {
      this[keyEscAction]();
    } else if (e.key === ' ' || e.code === 'Space') {
      this[keySpaceAction](e);
    } else if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      this[keySpaceAction](e);
    } else if (e.key === 'ArrowRight') {
      this[keyArrowRightAction](e);
    } else if (e.key === 'ArrowLeft') {
      this[keyArrowLeftAction](e);
    }
    e.stopPropagation();
  }

  /**
   * Handler that is called when the down key is pressed.
   *
   * @param {KeyboardEvent} e A key combination event.
   */
  [keyDownAction](e) {
    e.preventDefault();
    e.stopPropagation();
    this.focusNext();
  }

  /**
   * Handler that is called when the up key is pressed.
   *
   * @param {KeyboardEvent} e A key combination event.
   */
  [keyUpAction](e) {
    e.preventDefault();
    this.focusPrevious();
  }

  /**
   * Handles shift+tab keypress on the menu.
   */
  [keyShiftTabAction]() {
    const oldTabIndex = this.getAttribute('tabindex');
    this[shiftTabPressedValue] = true;
    this[focusedItemValue] = null;
    this.setAttribute('tabindex', '-1');
    setTimeout(() => {
      this.setAttribute('tabindex', oldTabIndex);
      this[shiftTabPressedValue] = false;
    }, 1);
  }

  /**
   * Handler that is called when the esc key is pressed.
   */
  [keyEscAction]() {
    const { focusedItem } = this;
    if (focusedItem) {
      focusedItem.blur();
    }
  }

  /**
   * A handler for the space bar key down.
   * @param {KeyboardEvent} e
   */
  [keySpaceAction](e) {
    e.preventDefault();
    e.stopPropagation();
    const path = e.composedPath();
    const target = /** @type HTMLElement */ (path && path[0]);
    if (!target) {
      return;
    }
    const { classList, dataset } = target;
    if (classList.contains('section-title')) {
      this[toggleSectionElement](target);
    } else if (classList.contains('list-item')) {
      const { graphId, graphShape } = dataset;
      if (graphId && graphShape) {
        this[makeSelection](graphId, /** @type SelectionType */ (graphShape));
      }
    }
  }

  /**
   * A handler for the key right down. Opens operations when needed.
   * @param {KeyboardEvent} e
   */
  [keyArrowRightAction](e) {
    const path = e.composedPath();
    const target = /** @type HTMLElement */ (path && path[0]);
    if (!target) {
      return;
    }
    const { classList, dataset } = target;
    if (dataset.graphId && classList.contains('endpoint') && classList.contains('list-item')) {
      if (!this[openedEndpointsValue].includes(dataset.graphId)) {
        this[openedEndpointsValue].push(dataset.graphId);
        this.requestUpdate();
      }
    }
  }

  /**
   * A handler for the key left down. Closes operations when needed.
   * @param {KeyboardEvent} e
   */
  [keyArrowLeftAction](e) {
    const path = e.composedPath();
    const target = /** @type HTMLElement */ (path && path[0]);
    if (!target) {
      return;
    }
    const { classList, dataset } = target;
    if (dataset.graphId && classList.contains('endpoint') && classList.contains('list-item')) {
      const index = this[openedEndpointsValue].indexOf(dataset.graphId);
      if (index !== -1) {
        this[openedEndpointsValue].splice(index, 1);
        this.requestUpdate();
      }
    }
  }

  /**
   * Focuses on the previous item in the navigation.
   */
  focusPrevious() {
    const items = this[listActiveItems]();
    const { length } = items;
    const curFocusIndex = items.indexOf(this[focusedItemValue]);
    for (let i = 1; i < length + 1; i++) {
      const item = items[(curFocusIndex - i + length) % length];
      if (item && !item.hasAttribute('disabled')) {
        const owner = (item.getRootNode && item.getRootNode()) || document;
        this[focusItem](item);
        // Focus might not have worked, if the element was hidden or not
        // focusable. In that case, try again.
        // @ts-ignore
        if (owner.activeElement === item) {
          return;
        }
      }
    }
  }

  /**
   * Focuses on the next item in the navigation.
   */
  focusNext() {
    const items = this[listActiveItems]();
    const { length } = items;
    const curFocusIndex = items.indexOf(this[focusedItemValue]);
    for (let i = 1; i < length + 1; i++) {
      const item = items[(curFocusIndex + i) % length];
      if (!item.hasAttribute('disabled')) {
        const owner = (item.getRootNode && item.getRootNode()) || document;
        this[focusItem](item);
        // Focus might not have worked, if the element was hidden or not
        // focusable. In that case, try again.
        // @ts-ignore
        if (owner.activeElement === item) {
          return;
        }
      }
    }
  }

  /**
   * Selects an item in the navigation.
   * Note, this dispatches the navigation action event.
   * @param {string} id
   */
  select(id) {
    if (!id) {
      return;
    }
    const element = /** @type HTMLElement */ (this.shadowRoot.querySelector(`[data-graph-id="${id}"]`));
    if (!element) {
      return;
    }
    const { graphShape } = element.dataset;
    this[makeSelection](id, /** @type SelectionType */ (graphShape));
  }

  /**
   * Lists all HTML elements that are currently rendered in the view.
   * @return {HTMLElement[]} Currently rendered items.
   */
  [listActiveItems]() {
    if (this[itemsValue]) {
      return this[itemsValue];
    }
    const { shadowRoot } = this;
    let result = /** @type HTMLElement[] */ ([]);
    if (this.summary) {
      const node = shadowRoot.querySelector('.list-item.summary');
      if (node) {
        result[result.length] = /** @type HTMLElement */ (node);
      }
    }
    if (this.hasEndpoints) {
      const node = shadowRoot.querySelector('.endpoints .section-title');
      if (node) {
        result[result.length] = /** @type HTMLElement */ (node);
      }
      const nodes = Array.from(shadowRoot.querySelectorAll('.endpoints .list-item.endpoint'));
      nodes.forEach((item) => {
        result[result.length] = /** @type HTMLElement */ (item);
        const collapse = item.nextElementSibling;
        if (!collapse || collapse.localName !== 'anypoint-collapse') {
          return;
        }
        const children = /** @type HTMLElement[] */ (Array.from(collapse.querySelectorAll('.list-item.operation')));
        if (children.length) {
          result = result.concat(children);
        }
      });
    }
    if (this.hasDocs) {
      const children = this[listSectionActiveNodes]('.documentation');
      result = result.concat(children);
    }
    if (this.hasSchemas) {
      const children = this[listSectionActiveNodes]('.schemas');
      result = result.concat(children);
    }
    if (this.hasSecurity) {
      const children = this[listSectionActiveNodes]('.security');
      result = result.concat(children);
    }
    this[itemsValue] = result.length ? result : undefined;
    return result;
  }

  /**
   * @param {string} selector The prefix for the query selector
   * @return {HTMLElement[]} Nodes returned from query function.
   */
  [listSectionActiveNodes](selector) {
    let result = /** @type HTMLElement[] */ ([]);
    const node = this.shadowRoot.querySelector(`${selector} .section-title`);
    if (node) {
      result[result.length] = /** @type HTMLElement */ (node);
      const collapse = node.nextElementSibling;
      if (collapse) {
        const children = /** @type HTMLElement[] */ (Array.from(collapse.querySelectorAll('.list-item')));
        if (children.length) {
          result = result.concat(children);
        }
      }
    }
    return result;
  }

  /**
   * Selects an item in the menu.
   *
   * @param {string} id The domain id of the node to be selected
   * @param {SelectionType} type The selected type of the item.
   */
  [makeSelection](id, type) {
    const element = /** @type HTMLElement */ (this.shadowRoot.querySelector(`[data-graph-id="${id}"]`));
    if (!element) {
      return;
    }
    this[selectedItemValue] = element;
    this[deselectItem](this.domainId, this.domainType);
    this[domainIdValue] = id;
    this[domainTypeValue] = type;
    if (id === 'summary') {
      this[summarySelected] = true;
    } else {
      this[selectItem](id, type);
    }
    this[focusItem](this[selectedItemValue]);
    this.requestUpdate();
    this[notifyNavigation](id, type);
    let parent = element.parentElement;
    while (parent) {
      if (parent === this) {
        return;
      }
      if (parent.localName === 'anypoint-collapse') {
        /** @type AnypointCollapseElement */ (parent).opened = true;
      }
      parent = parent.parentElement;
    }
  }

  /**
   * Selects an item.
   * @param {string} id The domain id of the menu item.
   * @param {SelectionType} type The type of the data.
   */
  [selectItem](id, type) {
    const selectable = this[findSelectable](id, type);
    if (selectable) {
      selectable.selected = true;
      this.requestUpdate();
    }
  }

  /**
   * Removes all selections from an item.
   * @param {string} id The domain id of the menu item.
   * @param {SelectionType} type The type of the data.
   */
  [deselectItem](id, type) {
    this[summarySelected] = false;
    const selectable = this[findSelectable](id, type);
    if (selectable) {
      selectable.selected = false;
      selectable.secondarySelected = false;
      this.requestUpdate();
    }
  }

  /**
   * Finds a selectable item by its id and type.
   * @param {string} id The domain id of the menu item.
   * @param {SelectionType} type The type of the data.
   * @returns {SelectableMenuItem|null}
   */
  [findSelectable](id, type) {
    if (!id || !type) {
      return null;
    }
    let selectable = /** @type SelectableMenuItem */ (null);
    if (type === 'resource') {
      selectable = /** @type EndpointItem[] */ (this[endpointsValue] || []).find((item) => item.id === id);
    } else if (type === 'operation') {
      const endpoint = /** @type EndpointItem[] */ (this[endpointsValue] || []).find((item) => {
        if (!Array.isArray(item.operations) || !item.operations.length) {
          return false;
        }
        const op =  item.operations.find((opItem) => opItem.id === id);
        return !!op;
      });
      if (endpoint) {
        selectable = /** @type OperationItem[] */ (endpoint.operations).find((item) => item.id === id);
      }
    } else if (type === 'documentation') {
      selectable = (this[documentationsValue] || []).find((item) => item.id === id);
    } else if (type === 'schema') {
      selectable = (this[schemasValue] || []).find((item) => item.id === id);
    } else if (type === 'security') {
      selectable = (this[securityValue] || []).find((item) => item.id === id);
    }
    return selectable;
  }

  /**
   * @param {string} value The new query. Empty or null to clear the query
   */
  [processQuery](value) {
    if (typeof value !== 'string' || value.trim() === '') {
      this[queryValue] = undefined;
    } else {
      this[queryValue] = value.toLowerCase();
    }
    this.requestUpdate();
  }

  /**
   * A handler for the search event from the filter input.
   * @param {Event} e
   */
  [searchHandler](e) {
    const input = /** @type HTMLInputElement */ (e.target);
    this.query = input.value;
    Events.Telemetry.event(this, {
      category: 'API navigation',
      action: 'Filter',
      label: input.value ? 'Query' : 'Clear',
    });
  }

  /**
   * Opens all sections of the menu and all endpoints.
   */
  expandAll() {
    this.endpointsOpened = true;
    this.schemasOpened = true;
    this.securityOpened = true;
    this.documentationsOpened = true;
    this.expandAllEndpoints();
  }

  /**
   * Closes all sections of the menu and all endpoints.
   */
  collapseAll() {
    this.endpointsOpened = false;
    this.schemasOpened = false;
    this.securityOpened = false;
    this.documentationsOpened = false;
    this.collapseAllEndpoints();
  }

  /**
   * Opens all endpoints exposing all operations
   */
  expandAllEndpoints() {
    this.endpointsOpened = true;
    const items = /** @type HTMLInputElement[] */ (Array.from(this.shadowRoot.querySelectorAll('section.endpoints .list-item.endpoint')));
    this[openedEndpointsValue] = [];
    items.forEach((item) => {
      const { graphId } = item.dataset;
      if (graphId) {
        this[openedEndpointsValue].push(graphId);
      }
    });
    this[endpointsExpandedValue] = true;
    this.requestUpdate();
  }

  /**
   * Hides all operations and collapses all endpoints.
   */
  collapseAllEndpoints() {
    this[openedEndpointsValue] = [];
    this[endpointsExpandedValue] = false;
    this.requestUpdate();
  }

  /**
   * Triggers a flow when the user can define a new endpoint in the navigation.
   * This renders an input in the view (in the endpoints list) where the user can enter the path name.
   */
  async addEndpoint() {
    if (!this.endpointsOpened) {
      this.endpointsOpened = true;
      await this.updateComplete;
    }
    this[addingEndpointValue] = true;
    await this.requestUpdate();
    const wrap = this.shadowRoot.querySelector('.add-endpoint-input');
    wrap.scrollIntoView();
    const input = wrap.querySelector('input');
    input.focus();
    input.select();
  }

  /**
   * Triggers a flow when the user can define a new documentation document.
   * This renders an input in the view (in the documentation list) where the user can enter the name.
   * @param {boolean=} isExternal Whether the documentation is a link to a www document.
   */
  async addDocumentation(isExternal=false) {
    if (!this.documentationsOpened) {
      this.documentationsOpened = true;
    }
    this[addingDocumentationValue] = true;
    this[addingExternalValue] = isExternal;
    await this.requestUpdate();
    const selector = isExternal ? '.add-external-doc-input' : '.add-documentation-input';
    const wrap = this.shadowRoot.querySelector(selector);
    wrap.scrollIntoView();
    const input = wrap.querySelector('input');
    input.focus();
    input.select();
  }

  /**
   * Triggers a flow when the user can define a new schema in the navigation.
   * This renders an input in the view (in the schema list) where the user can enter the schema name.
   * @param {SchemaAddType=} type The type of the schema to add. Default to `object`.
   */
  async addSchema(type='object') {
    if (!this.schemasOpened) {
      this.schemasOpened = true;
    }
    this[addingSchemaValue] = true;
    this[addingSchemaTypeValue] = type;
    await this.requestUpdate();
    const wrap = this.shadowRoot.querySelector('.add-schema-input');
    wrap.scrollIntoView();
    const input = wrap.querySelector('input');
    input.focus();
    input.select();
  }

  /**
   * Resets all tabindex attributes to the appropriate value based on the
   * current selection state. The appropriate value is `0` (focusable) for
   * the default selected item, and `-1` (not keyboard focusable) for all
   * other items. Also sets the correct initial values for aria-selected
   * attribute, true for default selected item and false for others.
   */
  [resetTabindices]() {
    const { selectedItem } = this;
    const items = this[listActiveItems]();
    items.forEach((item) => item.setAttribute('tabindex', item === selectedItem ? '0' : '-1'));
  }

  /**
   * Dispatches the navigation event.
   * @param {string} id The domain id of the selected node
   * @param {SelectionType} type The domain type.
   */
  [notifyNavigation](id, type) {
    let parent;
    if (type === 'operation' && id) {
      const node = /** @type HTMLElement */ (this.shadowRoot.querySelector(`.operation[data-graph-id="${id}"]`));
      if (node) {
        parent = node.dataset.graphParent;
      }
    }
    Events.Navigation.apiNavigate(this, id, type, parent);
    Events.Telemetry.event(this, {
      category: 'API navigation',
      action: 'Navigate',
      label: type,
    });
  }

  /**
   * Event handler for the keydown event of the add endpoint input.
   * @param {KeyboardEvent} e
   */
  [addEndpointKeydownHandler](e) {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      e.preventDefault();
      this[commitNewEndpoint]();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this[cancelNewEndpoint]();
    }
  }

  /**
   * Event handler for the keydown event of the add documentation input.
   * @param {KeyboardEvent} e
   */
  [addDocumentationKeydownHandler](e) {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      e.preventDefault();
      const input = /** @type HTMLInputElement */ (e.target);
      this[commitNewDocumentation](input.value);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this[addingDocumentationValue] = false;
      this[addingExternalValue] = undefined;
      this.requestUpdate();
    }
  }

  /**
   * Event handler for the keydown event of the add schema input.
   * @param {KeyboardEvent} e
   */
  [addSchemaKeydownHandler](e) {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      e.preventDefault();
      const input = /** @type HTMLInputElement */ (e.target);
      this[commitNewSchema](input.value);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this[addingSchemaValue] = false;
      this[addingSchemaTypeValue] = undefined;
      this.requestUpdate();
    }
  }

  async [commitNewEndpoint]() {
    const input = /** @type HTMLInputElement */ (this.shadowRoot.querySelector('.add-endpoint-input input'))
    if (!input) {
      return;
    }
    const name = input.value.trim();
    if (!name) {
      return;
    }
    // await Events.Endpoint.add(this, { path: name });
    await this[cancelNewEndpoint]();
  }

  async [cancelNewEndpoint]() {
    this[addingEndpointValue] = false;
    await this.requestUpdate();
  }

  /**
   * @param {string} value The title of the documentation.
   */
  async [commitNewDocumentation](value='') {
    const name = value.trim();
    if (!name) {
      return;
    }
    const opts = { title: name };
    const isExternal = this[addingExternalValue];
    if (isExternal) {
      const input = /** @type HTMLInputElement */ (this.shadowRoot.querySelector('.add-external-doc-input input'))
      opts.url = input.value;
    }
    this[addingDocumentationValue] = false;
    this[addingExternalValue] = undefined;
    // await Events.Documentation.add(this, opts);
    this.requestUpdate();
  }

  /**
   * @param {string} value The name of the schema.
   */
  async [commitNewSchema](value='') {
    const name = value.trim();
    if (!name) {
      return;
    }
    const type = this[addingSchemaTypeValue];
    const opts = { name };

    switch (type) {
      case 'object': opts.type = ns.w3.shacl.NodeShape; break;
      case 'scalar': opts.type = ns.aml.vocabularies.shapes.ScalarShape; break;
      case 'array': opts.type = ns.aml.vocabularies.shapes.ArrayShape; break;
      case 'file': opts.type = ns.aml.vocabularies.shapes.FileShape; break;
      case 'union': opts.type = ns.aml.vocabularies.shapes.UnionShape; break;
      default:
    }
    this[addingSchemaValue] = false;
    this[addingSchemaTypeValue] = undefined;
    // await Events.Type.add(this, opts);
    this.requestUpdate();
  }

  /**
   * Triggers a rename action for the menu item identified by the `id`.
   * @param {string} id The domain id of the item to edit.
   */
  async renameAction(id) {
    const item = this[findViewModelItem](id);
    if (!item) {
      return;
    }
    item.nameEditor = true;
    await this.requestUpdate();
    const input = /** @type HTMLInputElement */ (this.shadowRoot.querySelector(`input[data-id="${id}"]`));
    input.select();
    input.focus();
  }

  /**
   * @param {string} id The domain id of the item to find.
   * @returns {SelectableMenuItem & EditableMenuItem | null}
   */
  [findViewModelItem](id) {
    const endpoints = this[endpointsValue];
    if (endpoints && endpoints.length) {
      for (let i = 0, len = endpoints.length; i < len; i++) {
        const endpoint = endpoints[i];
        if (endpoint.id === id) {
          return endpoint;
        }
        const operation = endpoint.operations.find((op) => op.id === id);
        if (operation) {
          return operation;
        }
      }
    }
    const docs = this[documentationsValue];
    if (docs && docs.length) {
      const doc = docs.find((item) => item.id === id);
      if (doc) {
        return doc;
      }
    }
    const schemas = this[schemasValue];
    if (schemas && schemas.length) {
      const schema = schemas.find((item) => item.id === id);
      if (schema) {
        return schema;
      }
    }
    return null;
  }

  /**
   * A key down event handler on the rename input
   * @param {KeyboardEvent} e
   */
  async [renameKeydownHandler](e) {
    // do not interfere with the navigation logic.
    e.stopPropagation();
    if (!['Enter', 'NumpadEnter', 'Escape'].includes(e.code)) {
      return;
    }
    e.preventDefault();
    const input = /** @type HTMLInputElement */ (e.target);
    const { value, dataset } = input;
    const { id, type } = dataset;
    const item = this[findViewModelItem](id);
    if (!item) {
      return;
    }
    item.nameEditor = false;
    this.requestUpdate();
    if (e.code === 'Escape') {
      return;
    }
    await this[updateNameHandler](id, value, /** @type SelectionType */ (type));
  }

  /**
   * A blur event handler on the rename input
   * @param {Event} e
   */
  async [renameBlurHandler](e) {
    const input = /** @type HTMLInputElement */ (e.target);
    const { value, dataset } = input;
    const { id, type } = dataset;
    const item = this[findViewModelItem](id);
    if (!item) {
      return;
    }
    item.nameEditor = false;
    this.requestUpdate();
    await this[updateNameHandler](id, value, /** @type SelectionType */ (type));
  }

  /**
   * Updates the name or the display name of the menu object
   * @param {string} id The id of the domain object to update
   * @param {string} value The new value.
   * @param {SelectionType} type The object type
   * @returns {Promise<void>} A promise when the update operation finish.
   */
  async [updateNameHandler](id, value, type) {
    const updateValue = value.trim();
    if (!updateValue) {
      return;
    }
    const promise = Promise.reject(new Error(`APi editing of ${type} ${id} is not yet supported`));
    // let promise;
    // if (type === 'SelectionType') {
    //   promise = Events.Endpoint.update(this, id, 'name', updateValue);
    // } else if (type === 'operation') {
    //   promise = Events.Operation.update(this, id, 'name', updateValue);
    // } else if (type === 'documentation') {
    //   const obj = await StoreEvents.Documentation.get(this, id);
    //   const prop = obj.title ? 'title' : 'description';
    //   promise = Events.Documentation.update(this, id, prop, updateValue);
    // } else if (type === 'schema') {
    //   const obj = await StoreEvents.Type.get(this, id);
    //   const { displayName } = obj;
    //   const prop = displayName ? 'displayName' : 'name';
    //   promise = Events.Type.update(this, id, prop, updateValue);
    // }
    try {
      await promise;
    } catch (e) {
      Events.Reporting.error(this, e, `Unable rename object: ${e.message}`, 'graph-api-navigation');
    }
  }

  /**
   * Click handler for the external navigation item.
   * Dispatches the external navigation event. When this event is handled (cancelled)
   * the original event is cancelled to prevent default behavior.
   * @param {Event} e
   */
  [externalDocumentationHandler](e) {
    const a = /** @type HTMLAnchorElement  */ (e.currentTarget);
    const handled = Events.Navigation.navigateExternal(this, a.href);
    if (handled) {
      cancelEvent(e);
    }
  }

  render() {
    return html`
    <div class="wrapper" role="menu" aria-label="Navigate the API">
      ${this[filterTemplate]()}
      ${this[summaryTemplate]()}
      ${this[endpointsTemplate]()}
      ${this[documentationsTemplate]()}
      ${this[schemasTemplate]()}
      ${this[securitiesTemplate]()}
    </div>
    `;
  }

  /**
   * @return {TemplateResult|string} The template for the summary filed.
   */
  [summaryTemplate]() {
    const { summaryRendered, summaryLabel } = this;
    if (!summaryRendered || !summaryLabel) {
      return '';
    }
    const selected = this[summarySelected];
    const classes = {
      'list-item': true,
      summary: true,
      selected,
    };
    return html`
    <section class="summary">
      <div 
        part="api-navigation-list-item" 
        class="${classMap(classes)}"
        role="menuitem"
        tabindex="-1"
        data-graph-id="summary"
        data-graph-shape="summary"
        @click="${this[itemClickHandler]}"
      >
        ${summaryLabel}
      </div>
    </section>
    `;
  }

  /**
   * @return {TemplateResult|string} The template for the list of endpoints.
   */
  [endpointsTemplate]() {
    const { edit } = this;
    if (!this.hasEndpoints && !edit) {
      return '';
    }
    const items = this[getFilteredEndpoints]();
    const hasItems = !!items && !!items.length;
    if (!hasItems && !edit) {
      return '';
    }
    const { endpointsOpened, documentMeta } = this;
    const toggleState = endpointsOpened ? 'Expanded' : 'Collapsed';
    const sectionLabel = documentMeta && documentMeta.isAsync ? 'Channels' : 'Endpoints';
    const classes = {
      endpoints: true,
      opened: endpointsOpened,
    };
    const addingEndpoint = this[addingEndpointValue];
    const showEmpty = !hasItems && !addingEndpoint;
    return html`
    <section
      class="${classMap(classes)}"
    >
      <div
        class="section-title"
        data-property="endpointsOpened"
        data-section="endpoints"
        @click="${this[toggleSectionClickHandler]}"
        @keydown="${this[toggleSectionKeydownHandler]}"
        title="Toggle the list"
        aria-haspopup="true"
        role="menuitem"
      >
        <div class="title-h3">${sectionLabel}</div>
        <anypoint-icon-button
          part="toggle-button"
          class="toggle-button section"
          aria-label="Toggle the list"
          ?anypoint="${this.anypoint}"
          tabindex="-1"
        >
          <arc-icon aria-label="${toggleState}" role="img" icon="keyboardArrowDown"></arc-icon>
        </anypoint-icon-button>
      </div>
      <anypoint-collapse
        .opened="${endpointsOpened}"
        aria-hidden="${endpointsOpened ? 'false' : 'true'}"
        role="menu"
      >
        <div class="children">
          ${addingEndpoint ? this[addEndpointInputTemplate]() : ''}
          ${hasItems ? items.map((item) => this[endpointTemplate](item)) : ''}
          ${showEmpty ? html`<p class="empty-section">No endpoints in this API</p>` : ''}
        </div>
      </anypoint-collapse>
    </section>
    `;
  }

  /**
   * @param {EndpointItem} item
   * @return {TemplateResult} The template for an endpoint.
   */
  [endpointTemplate](item) {
    const { indent, operations, label, path, id, selected, secondarySelected, nameEditor } = item;
    const itemStyles = {
      paddingLeft: this[computeEndpointPaddingValue](indent),
    };
    const renderChildren = Array.isArray(operations) && !!operations.length;
    const opened = renderChildren && this[openedEndpointsValue].includes(id);
    const classes = {
      'list-item': true,
      'endpoint': true,
      opened,
      selected, 
      secondarySelected,
    };
    return html`
    <div
      part="api-navigation-list-item"
      class="${classMap(classes)}"
      data-path="${path}"
      data-graph-id="${ifDefined(id)}"
      data-graph-shape="resource"
      @click="${this[itemClickHandler]}"
      title="Open this endpoint"
      style="${styleMap(itemStyles)}"
      role="menuitem"
      aria-haspopup="true"
    >
      ${nameEditor ? 
        this[renameInputTemplate](id, label, 'resource') 
        : html`
        ${renderChildren ?  this[endpointToggleTemplate](id): html`<div class="endpoint-toggle-mock"></div>`}
        <div class="endpoint-name">${label}</div>
        `
      }
    </div>
    ${renderChildren ? html`
      <anypoint-collapse
        part="api-navigation-operation-collapse"
        class="operation-collapse"
        data-graph-id="${id}"
        role="menu"
        .opened="${opened}"
      >
        ${item.operations.map((op) => this[operationItemTemplate](item, op))}
      </anypoint-collapse>
    ` : ''}
    `;
  }

  /**
   * @param {string} id The domain id of the endpoint.
   * @return {TemplateResult} The template for an endpoint toggle button.
   */
  [endpointToggleTemplate](id) {
    return html`
    <anypoint-icon-button 
      class="toggle-button endpoint" 
      aria-label="Toggle the list of operations" 
      ?anypoint="${this.anypoint}" 
      tabindex="-1"
      data-graph-id="${id}"
      @click="${this[endpointToggleClickHandler]}"
    >
      <arc-icon icon="arrowDropDown" role="img" aria-label="Toggle the list of operations"></arc-icon>
    </anypoint-icon-button>`;
  }

  /**
   * @param {EndpointItem} item The endpoint definition 
   * @param {OperationItem} op The operation definition.
   * @return {TemplateResult} The template for an operation list item.
   */
  [operationItemTemplate](item, op) {
    const { id, name, method, selected, secondarySelected, nameEditor } = op;
    const itemStyles = {
      paddingLeft: this[computeOperationPaddingValue](item.indent),
    };
    const classes = {
      'list-item': true,
      operation: true,
      selected, 
      secondarySelected,
    };
    return html`
    <div
      part="api-navigation-list-item"
      class="${classMap(classes)}"
      role="menuitem"
      tabindex="-1"
      data-graph-parent="${item.id}"
      data-graph-id="${id}"
      data-graph-shape="operation"
      data-operation="${method}"
      @click="${this[itemClickHandler]}"
      style="${styleMap(itemStyles)}"
    >
      ${nameEditor ? 
        this[renameInputTemplate](id, name, 'operation') 
        : html`
        <span class="method-label" data-method="${method}">${method}</span>
        ${name}
        `
      }
    </div>
    `;
  }

  /**
   * @return {TemplateResult|string} The template for the documentations section.
   */
  [documentationsTemplate]() {
    const { edit } = this;
    const items = this[getFilteredDocumentations]();
    if (!items.length && !edit) {
      return '';
    }
    const { documentationsOpened } = this;
    const classes = {
      documentation: true,
      opened: documentationsOpened,
    };
    const toggleState = documentationsOpened ? 'Expanded' : 'Collapsed';
    const addingDocumentation = this[addingDocumentationValue];
    const showItems = !!items.length;
    const showEmpty = !showItems && !addingDocumentation;
    return html`
    <section
      class="${classMap(classes)}"
    >
      <div
        class="section-title"
        data-property="documentationsOpened"
        data-section="documentations"
        @click="${this[toggleSectionClickHandler]}"
        @keydown="${this[toggleSectionKeydownHandler]}"
        title="Toggle the list"
        aria-haspopup="true"
        role="menuitem"
      >
        <div class="title-h3">Documentation</div>
        <anypoint-icon-button
          part="toggle-button"
          class="toggle-button section"
          aria-label="Toggle the list"
          ?anypoint="${this.anypoint}"
          tabindex="-1"
        >
          <arc-icon aria-label="${toggleState}" role="img" icon="keyboardArrowDown"></arc-icon>
        </anypoint-icon-button>
      </div>
      <anypoint-collapse .opened="${documentationsOpened}">
        <div class="children">
          ${addingDocumentation ? this[addDocumentationInputTemplate]() : ''}
          ${showItems ? items.map((item) => this[documentationTemplate](item)) : ''}
          ${showEmpty ? html`<p class="empty-section">No documentations in this API</p>` : ''}
        </div>
      </anypoint-collapse>
    </section>
    `;
  }

  /**
   * @param {DocumentationItem} item
   * @return {TemplateResult} The template for the documentation list item.
   */
  [documentationTemplate](item) {
    if (item.url) {
      return this[externalDocumentationTemplate](item);
    }
    const { title, id, selected, secondarySelected, nameEditor } = item;
    const classes = {
      'list-item': true,
      documentation: true,
      selected, 
      secondarySelected,
    }
    return html`<div
      part="api-navigation-list-item"
      class="${classMap(classes)}"
      role="menuitem"
      tabindex="-1"
      data-graph-id="${id}"
      data-graph-shape="documentation"
      @click="${this[itemClickHandler]}"
    >
      ${nameEditor ? this[renameInputTemplate](id, title, 'documentation') : title}
    </div>`;
  }

  /**
   * @param {DocumentationItem} item
   * @return {TemplateResult} The template for the external documentation list item.
   */
  [externalDocumentationTemplate](item) {
    const { title, description, url, id, selected, secondarySelected, nameEditor } = item;
    const label = title || description;
    const classes = {
      'list-item': true,
      documentation: true,
      selected, 
      secondarySelected,
    }
    return html`<a
      href="${url}"
      target="_blank"
      part="api-navigation-list-item"
      class="${classMap(classes)}"
      tabindex="-1"
      data-graph-id="${id}"
      data-graph-shape="documentation"
      @click="${this[externalDocumentationHandler]}"
    >
      ${nameEditor ? 
        this[renameInputTemplate](id, label, 'documentation') 
        : html`
        ${label}
        <arc-icon class="icon new-tab" title="Opens in a new tab" icon="openInNew"></arc-icon>
        `
      }
    </a>`;
  }

  /**
   * @return {TemplateResult|string} The template for the types (schemas) section.
   */
  [schemasTemplate]() {
    const { edit } = this;
    const items = this[getFilteredSchemas]();
    if (!items.length && !edit) {
      return '';
    }
    const { schemasOpened } = this;
    const classes = {
      schemas: true,
      opened: schemasOpened,
    };
    const toggleState = schemasOpened ? 'Expanded' : 'Collapsed';
    const addingSchema = this[addingSchemaValue];
    const showItems = !!items.length;
    const showEmpty = !showItems && !addingSchema;
    return html`
    <section
      class="${classMap(classes)}"
    >
      <div
        class="section-title"
        data-property="schemasOpened"
        data-section="schemas"
        @click="${this[toggleSectionClickHandler]}"
        @keydown="${this[toggleSectionKeydownHandler]}"
        title="Toggle the list"
        aria-haspopup="true"
        role="menuitem"
      >
        <div class="title-h3">Schemas</div>
        <anypoint-icon-button
          part="toggle-button"
          class="toggle-button section"
          aria-label="Toggle the list"
          ?anypoint="${this.anypoint}"
          tabindex="-1"
        >
          <arc-icon aria-label="${toggleState}" role="img" icon="keyboardArrowDown"></arc-icon>
        </anypoint-icon-button>
      </div>
      <anypoint-collapse .opened="${schemasOpened}">
        <div class="children">
          ${addingSchema ? this[addSchemaInputTemplate]() : ''}
          ${showItems ? items.map((item) => this[schemaTemplate](item)) : ''}
          ${showEmpty ? html`<p class="empty-section">No schemas in this API</p>` : ''}
        </div>
      </anypoint-collapse>
    </section>
    `;
  }

  /**
   * @param {NodeShapeItem} item
   * @return {TemplateResult} The template for the documentation list item.
   */
  [schemaTemplate](item) {
    const { id, displayName, name, selected, secondarySelected, nameEditor } = item;
    const label = displayName || name || 'Unnamed schema';
    const classes = {
      'list-item': true,
      schema: true,
      selected, 
      secondarySelected,
    }
    return html`
    <div
      part="api-navigation-list-item"
      class="${classMap(classes)}"
      role="menuitem"
      tabindex="-1"
      data-graph-id="${id}"
      data-graph-shape="schema"
      @click="${this[itemClickHandler]}"
    >
      ${nameEditor ? this[renameInputTemplate](id, label, 'schema') : label}
   </div>`;
  }

  /**
   * @return {TemplateResult|string} The template for the security section.
   */
  [securitiesTemplate]() {
    const items = this[getFilteredSecurity]();
    if (!items.length) {
      return '';
    }
    const { securityOpened } = this;
    const classes = {
      security: true,
      opened: securityOpened,
    };
    const toggleState = securityOpened ? 'Expanded' : 'Collapsed';
    return html`
    <section
      class="${classMap(classes)}"
    >
      <div
        class="section-title"
        data-property="securityOpened"
        data-section="security"
        @click="${this[toggleSectionClickHandler]}"
        @keydown="${this[toggleSectionKeydownHandler]}"
        title="Toggle the list"
        aria-haspopup="true"
        role="menuitem"
      >
        <div class="title-h3">Security</div>
        <anypoint-icon-button
          part="toggle-button"
          class="toggle-button section"
          aria-label="Toggle the list"
          ?anypoint="${this.anypoint}"
          tabindex="-1"
        >
          <arc-icon aria-label="${toggleState}" role="img" icon="keyboardArrowDown"></arc-icon>
        </anypoint-icon-button>
      </div>
      <anypoint-collapse .opened="${securityOpened}">
        <div class="children">
          ${items.map((item) => this[securityTemplate](item))}
        </div>
      </anypoint-collapse>
    </section>
    `;
  }

  /**
   * @param {SecurityItem} item
   * @return {TemplateResult} The template for the security list item.
   */
  [securityTemplate](item) {
    const { id, displayName, name, selected, secondarySelected, type } = item;
    const label = displayName || name || 'Unnamed security';
    const classes = {
      'list-item': true,
      security: true,
      selected, 
      secondarySelected,
    }
    return html`
    <div
      part="api-navigation-list-item"
      class="${classMap(classes)}"
      role="menuitem"
      tabindex="-1"
      data-graph-id="${id}"
      data-graph-shape="security"
      @click="${this[itemClickHandler]}"
    >
      ${type}: ${label}
   </div>`;
  }

  /**
   * @return {TemplateResult|string} The template for the filter input.
   */
  [filterTemplate]() {
    const { filter } = this;
    if (!filter) {
      return '';
    }
    return html`
    <div class="filter-wrapper">
      <input 
        type="search" 
        name="filter" 
        aria-label="Filter the menu" 
        placeholder="Filter" 
        @search="${this[searchHandler]}"
        @change="${this[searchHandler]}"
      />
      <arc-icon icon="search"></arc-icon>
    </div>
    `;
  }

  /**
   * @return {TemplateResult} The template for the new endpoint input.
   */
  [addEndpointInputTemplate]() {
    return html`
    <div
      part="api-navigation-input-item"
      class="input-item add-endpoint-input"
      data-graph-shape="resource"
    >
      <input 
        type="text" 
        class="add-endpoint-input" 
        @keydown="${this[addEndpointKeydownHandler]}"
        placeholder="Endpoint's path"
        aria-label="Enter the path for the endpoint"
      >
      <arc-icon icon="add" title="Enter to save, ESC to cancel"></arc-icon>
    </div>
    `;
  }

  /**
   * @return {TemplateResult} The template for the new documentation input.
   */
  [addDocumentationInputTemplate]() {
    const isExternal = this[addingExternalValue];
    return html`
    ${isExternal ? html`
    <div
      part="api-navigation-input-item"
      class="input-item add-external-doc-input"
    >
      <input 
        type="url" 
        class="add-external-doc-input" 
        aria-label="Enter the documentation URL"
        placeholder="Documentation URL"
      />
    </div>
    ` : ''}
    <div
      part="api-navigation-input-item"
      class="input-item add-documentation-input"
      data-graph-shape="documentation"
    >
      <input 
        type="text" 
        class="add-documentation-input" 
        aria-label="Enter name for the documentation"
        placeholder="Documentation title"
        @keydown="${this[addDocumentationKeydownHandler]}"/>
      <arc-icon icon="add" title="Enter to save, ESC to cancel"></arc-icon>
    </div>
    `;
  }

  /**
   * @return {TemplateResult} The template for the new schema input.
   */
  [addSchemaInputTemplate]() {
    return html`
    <div
      part="api-navigation-input-item"
      class="input-item add-schema-input"
      data-graph-shape="schema"
    >
      <input type="text" class="add-schema-input" @keydown="${this[addSchemaKeydownHandler]}"/>
      <arc-icon icon="add" title="Enter to save, ESC to cancel"></arc-icon>
    </div>
    `;
  }

  /**
   * @param {string} id The domain id of the item being edited
   * @param {string} label The current name to render.
   * @param {SelectionType} type
   * @returns {TemplateResult} The template for the rename input. 
   */
  [renameInputTemplate](id, label='', type) {
    return html`
    <input 
      type="text" 
      .value="${label}" 
      required
      class="rename"
      data-id="${id}"
      data-type="${type}"
      @click="${cancelEvent}"
      @keydown="${this[renameKeydownHandler]}"
      @blur="${this[renameBlurHandler]}"
    />
    `;
  }
}
