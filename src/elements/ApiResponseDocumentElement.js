/* eslint-disable class-methods-use-this */
import { html } from 'lit-element';
import { MarkdownStyles } from '@advanced-rest-client/highlight';
import '@advanced-rest-client/highlight/arc-marked.js';
import '@anypoint-web-components/awc/anypoint-button.js';
import '@anypoint-web-components/awc/anypoint-collapse.js';
import '@anypoint-web-components/awc/anypoint-radio-button.js';
import '@anypoint-web-components/awc/anypoint-radio-group.js';
import '@advanced-rest-client/icons/arc-icon.js';
import commonStyles from './styles/Common.js';
import elementStyles from './styles/ApiResponse.js';
import '../../define/api-payload-document.js';
import '../../define/api-parameter-document.js';
import { 
  ApiDocumentationBase, 
  paramsSectionTemplate, 
  schemaItemTemplate,
  descriptionTemplate,
  customDomainPropertiesTemplate,
} from './ApiDocumentationBase.js';
import { Events } from '../events/Events.js';

/** @typedef {import('lit-element').TemplateResult} TemplateResult */
/** @typedef {import('../helpers/api').ApiResponse} ApiResponse */
/** @typedef {import('../helpers/api').ApiPayload} ApiPayload */
/** @typedef {import('../helpers/api').ApiTemplatedLink} ApiTemplatedLink */
/** @typedef {import('../helpers/api').ApiIriTemplateMapping} ApiIriTemplateMapping */
/** @typedef {import('@anypoint-web-components/awc').AnypointRadioGroupElement} AnypointRadioGroupElement */

export const queryResponse = Symbol('queryResponse');
export const responseValue = Symbol('responseValue');
export const queryPayloads = Symbol('queryPayloads');
export const payloadsValue = Symbol('payloadsValue');
export const payloadValue = Symbol('payloadValue');
export const headersTemplate = Symbol('headersTemplate');
export const payloadTemplate = Symbol('payloadTemplate');
export const payloadSelectorTemplate = Symbol('payloadSelectorTemplate');
export const linksTemplate = Symbol('linksTemplate');
export const linkTemplate = Symbol('linkTemplate');
export const linkOperationTemplate = Symbol('linkOperationTemplate');
export const linkMappingsTemplate = Symbol('mappingsTemplate');
export const linkMappingTemplate = Symbol('linkMappingTemplate');
export const mediaTypeSelectHandler = Symbol('mediaTypeSelectHandler');

/**
 * A web component that renders the documentation page for an API response object.
 */
export default class ApiResponseDocumentElement extends ApiDocumentationBase {
  get styles() {
    return [commonStyles, elementStyles, MarkdownStyles];
  }

  /**
   * @returns {boolean} true when has headers parameters definition
   */
  get hasHeaders() {
    const response = this[responseValue];
    if (!response) {
      return false;
    }
    return Array.isArray(response.headers) && !!response.headers.length;
  }

  /**
   * @returns {ApiPayload|undefined}
   */
  get [payloadValue]() {
    const { mimeType } = this;
    const payloads = this[payloadsValue];
    if (!Array.isArray(payloads) || !payloads.length) {
      return undefined;
    }
    if (!mimeType) {
      return payloads[0];
    }
    return payloads.find((item) => item.mediaType === mimeType);
  }

  /**
   * @returns {ApiResponse}
   */
  get response() {
    return this[responseValue];
  }

  /**
   * @param {ApiResponse} value
   */
  set response(value) {
    const old = this[responseValue];
    if (old === value) {
      return;
    }
    this[responseValue] = value;
    this.processGraph();
  }

  static get properties() {
    return {
      /** 
       * When set it opens the headers section
       */
      headersOpened: { type: Boolean, reflect: true },
      /** 
       * When set it opens the payload section
       */
      payloadOpened: { type: Boolean, reflect: true },
      /** 
       * The currently selected media type for the payloads.
       */
      mimeType: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    /**
     * @type {ApiResponse}
     */
    this[responseValue] = undefined;
    /**
     * @type {ApiPayload[]}
     */
    this[payloadsValue] = undefined;
    /**
     * @type {string}
     */
    this.mimeType = undefined;

    this.headersOpened = false;
    this.payloadOpened = false;
  }

  /**
   * Queries the graph store for the API Response data.
   * @returns {Promise<void>}
   */
  async processGraph() {
    await this[queryResponse]();
    await this[queryPayloads]();
    await this.requestUpdate();
  }

  /**
   * Queries the store for the response data, when needed.
   * @returns {Promise<void>}
   */
  async [queryResponse]() {
    const { domainId } = this;
    if (!domainId) {
      // this[responseValue] = undefined;
      return;
    }
    if (this[responseValue] && this[responseValue].id === domainId) {
      // in case the response model was provided via the property setter.
      return;
    }
    try {
      const info = await Events.Response.get(this, domainId);
      this[responseValue] = info;
    } catch (e) {
      this[responseValue] = undefined;
      Events.Telemetry.exception(this, e.message, false);
      Events.Reporting.error(this, e, `Unable to query for API response data: ${e.message}`, this.localName);
    }
  }

  async [queryPayloads]() {
    const { response } = this;
    if (!response || !Array.isArray(response.payloads) || !response.payloads.length) {
      this[payloadsValue] = undefined;
      return;
    }
    this[payloadsValue] = response.payloads;
  }

  /**
   * @param {Event} e
   */
  [mediaTypeSelectHandler](e) {
    const group = /** @type AnypointRadioGroupElement */ (e.target);
    const { selectedItem } = group;
    if (!selectedItem) {
      return;
    }
    const mime = selectedItem.dataset.value;
    this.mimeType = mime;
  }

  render() {
    if (!this[responseValue]) {
      return html``;
    }
    return html`
    <style>${this.styles}</style>
    ${this[customDomainPropertiesTemplate](this[responseValue].customDomainProperties)}
    ${this[descriptionTemplate](this[responseValue].description)}
    ${this[headersTemplate]()}
    ${this[linksTemplate]()}
    ${this[payloadTemplate]()}
    `;
  }

  /**
   * @returns {TemplateResult|string} The template for the headers
   */
  [headersTemplate]() {
    if (!this.hasHeaders) {
      return '';
    }
    const { response } = this;
    const content = response.headers.map((id) => this[schemaItemTemplate](id));
    return this[paramsSectionTemplate]('Headers', 'headersOpened', content);
  }

  /**
   * @returns {TemplateResult|string} The template for the payload section
   */
  [payloadTemplate]() {
    const payload = this[payloadValue];
    if (!payload) {
      return '';
    }
    const content = html`
    ${this[payloadSelectorTemplate]()}
    <api-payload-document .domainId="${payload.id}" .payload="${payload}" ?anypoint="${this.anypoint}"></api-payload-document>
    `;
    return this[paramsSectionTemplate]('Response body', 'payloadOpened', content);
  }

  /**
   * @returns {TemplateResult|string} The template for the payload media type selector.
   */
  [payloadSelectorTemplate]() {
    const payloads = this[payloadsValue];
    if (!Array.isArray(payloads) || payloads.length < 2) {
      return '';
    }
    const mime = /** @type string[] */ ([]);
    payloads.forEach((item) => {
      if (item.mediaType) {
        mime.push(item.mediaType);
      }
    });
    if (!mime.length) {
      return '';
    }
    const mimeType = this.mimeType || mime[0];
    return html`
    <div class="media-type-selector">
      <label>Body content type</label>
      <anypoint-radio-group 
        @select="${this[mediaTypeSelectHandler]}" 
        attrForSelected="data-value" 
        .selected="${mimeType}"
      >
        ${mime.map((item) => 
          html`<anypoint-radio-button class="response-toggle" name="responseMime" data-value="${item}">${item}</anypoint-radio-button>`)}
      </anypoint-radio-group>
    </div>
    `;
  }

  /**
   * @returns {TemplateResult|string} The template for the response links
   */
  [linksTemplate]() {
    const { response } = this;
    if (!response) {
      return '';
    }
    const { links=[] } = response;
    if (!Array.isArray(links) || !links.length) {
      return '';
    }
    return html`
    <div class="links-header">Links</div>
    ${links.map((link) => this[linkTemplate](link))}
    `;
  }

  /**
   * @param {ApiTemplatedLink} link
   * @returns {TemplateResult} A template for the link
   */
  [linkTemplate](link) {
    const { name, mapping, operationId, } = link;
    return html`
    <div class="link-header text-selectable">${name}</div>
    ${this[linkOperationTemplate](operationId)}
    <div slot="markdown-html" class="link-table text-selectable">
      ${this[linkMappingsTemplate](mapping)}
    </div>
    `;
  }

  /**
   * @param {string} operationId
   * @returns {TemplateResult|string} The template for the link's operation
   */
  [linkOperationTemplate](operationId) {
    if (!operationId) {
      return '';
    }
    return html`
    <div class="operation-id">
      <span class="label">Operation ID:</span>
      <span class="operation-name text-selectable">${operationId}</span>
    </div>
    `;
  }

  /**
   * @param {ApiIriTemplateMapping[]} mappings
   * @returns {TemplateResult|string} The template for the link's operation
   */
  [linkMappingsTemplate](mappings) {
    if (!mappings) {
      return '';
    }
    return html`
    <table class="mapping-table text-selectable">
      <tr>
        <th>Variable</th>
        <th>Expression</th>
      </tr>
      ${mappings.map(item => this[linkMappingTemplate](item))}
    </table>
    `;
  }

  /**
   * @param {ApiIriTemplateMapping} mapping
   * @returns {TemplateResult} The template for the link's operation
   */
  [linkMappingTemplate](mapping) {
    const { linkExpression, templateVariable } = mapping;
    return html`
    <tr>
      <td>${templateVariable}</td>
      <td>${linkExpression}</td>
    </tr>
    `;
  }
}
