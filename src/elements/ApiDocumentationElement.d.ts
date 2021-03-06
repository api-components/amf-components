import { TemplateResult } from 'lit-element';
import { Oauth2Credentials } from '@advanced-rest-client/base';
import { ApiDocumentationBase } from './ApiDocumentationBase.js';
import { ApiSummary } from '../helpers/api';
import { ServerType, SelectionType, DocumentMeta } from '../types';
import { ApiNavigationEvent } from '../events/NavigationEvents';

export const operationIdValue: unique symbol;
export const domainIdValue: unique symbol;
export const domainTypeValue: unique symbol;
export const navigationHandler: unique symbol;
export const navEventsRegistered: unique symbol;
export const registerNavigationEvents: unique symbol;
export const unregisterNavigationEvents: unique symbol;
export const handleNavigationEventsValue: unique symbol;
export const processApiSpecSelection: unique symbol;
export const processLibrarySelection: unique symbol;
export const renderedViewValue: unique symbol;
export const renderedModelValue: unique symbol;
export const processFragment: unique symbol;
export const processPartial: unique symbol;
export const processEndpointPartial: unique symbol;
export const apiSummaryValue: unique symbol;
export const serverSelectorTemplate: unique symbol;
export const serversCountHandler: unique symbol;
export const serverChangeHandler: unique symbol;
export const modelTemplate: unique symbol;
export const summaryTemplate: unique symbol;
export const securityTemplate: unique symbol;
export const documentationTemplate: unique symbol;
export const schemaTemplate: unique symbol;
export const resourceTemplate: unique symbol;

/**
 * A main documentation view for an AMF model representing a sync or an async API.
 * 
 * This element works with the [AMF](https://github.com/mulesoft/amf) data model.
 * 
 * @fires tryit
 * @fires apirequest
 * @fires apiabort
 * @fires apinavigate
 */
export default class ApiDocumentationElement extends ApiDocumentationBase {
  /**
   * Type of the selected domain item.
   * @attribute
   */
  domainType: SelectionType;
  [domainTypeValue]: SelectionType;
  /** 
   * The domain id of the currently rendered API operation.
   * When selecting an operation the `domainId` is the id if the parent endpoint.
   * @attribute
   */
  operationId: string;
  [operationIdValue]: string;
  /**
   * By default application hosting the element must set `domainId` and
   * `domainType` properties. When using `api-navigation` element
   * by setting this property the element listens for navigation events
   * and updates the state
   * @attribute
   */
  handleNavigationEvents: boolean;
  [handleNavigationEventsValue]: boolean;
  /**
   * A property to set to override AMF's model base URI information.
   * @attribute
   */
  baseUri: string;
  /** 
   * When set it renders the "try it" button that dispatches the `tryit` event.
   * @attribute
   */
  tryItButton: boolean;
  /** 
   * When set it renders the "try it" panel next to the operation documentation.
   * Setting this automatically disables the `tryItButton` property.
   * 
   * Note, use this only when there's enough space on the screen to render 2 panels side-by-side.
   * @attribute
   */
  tryItPanel: boolean;
  /**
   * OAuth2 redirect URI.
   * This value **must** be set in order for OAuth 1/2 to work properly.
   * This is only required in inline mode (`inlineMethods`).
   * @attribute
   */
  redirectUri: string;
  /** 
   * When set it renders the URL input above the URL parameters in the HTTP editor.
   * @attribute
   */
  httpUrlEditor: boolean;
  /** 
   * When set it applies the authorization values to the request dispatched
   * with the API request event.
   * If possible, it applies the authorization values to query parameter or headers
   * depending on the configuration.
   * 
   * When the values arr applied to the request the authorization config is kept in the
   * request object, but its `enabled` state is always `false`, meaning other potential
   * processors should ignore this values.
   * 
   * If this property is not set then the application hosting this component should
   * process the authorization data and apply them to the request.
   * @attribute
   */
  httpApplyAuthorization: boolean;
  /**
   * List of credentials source passed to the HTTP editor
   * @attribute
   */
  httpCredentialsSource: Oauth2Credentials;
  /**
   * Optional property to set on the request editor. 
   * When true, the server selector is not rendered
   * @attribute
   */
  noServerSelector: boolean;
  /**
   * When set it renders "add custom" item button in the HTTP request editor.
   * If the element is to be used without AMF model this should always
   * be enabled. Otherwise users won't be able to add a parameter.
   * @attribute
   */
  httpAllowCustom: boolean;
  /**
   * Optional property to set on the request editor. 
   * If true, the server selector custom base URI option is rendered
   * @attribute
   */
  allowCustomBaseUri: boolean;
  /**
   * The URI of the server currently selected in the server selector
   * @attribute
   */
  serverValue: string;
  /**
   * The type of the server currently selected in the server selector
   * @attribute
   */
  serverType: ServerType;
  serversCount: number;
  /**
   * Former `effectiveBaseUri`.
   * @returns The URI for the API defined by the `baseUri` property or the `serverValue`.
   */
  get apiBaseUri(): string | undefined;

  /**
   * @deprecated Use `apiBaseUri` instead.
   */
  get effectiveBaseUri(): string | undefined;

  /** @returns The domain type of the rendered view. */
  get renderedView(): string;

  /** @returns The domain model rendered in the view. */
  get renderedModel(): any;

  get renderSelector(): boolean;

  /**
   * This is a computed value from the AMF model.
   * @returns true when whe currently loaded API is an async API.
   */
  get isAsync(): boolean;
  /**
   * @returns The mime type of the schema that is being rendered.
   */
  get schemaMime(): string|undefined;
  get documentMeta(): DocumentMeta;
  [apiSummaryValue]: ApiSummary;
  [navEventsRegistered]: boolean;
  /**
   * The mime type of the currently selected schema.
   * @attribute
   */
  schemaMimeType: string;

  constructor();

  disconnectedCallback(): void;

  /**
   * Registers the api navigation event listener handler
   * on the window object.
   */
  [registerNavigationEvents](): void;

  /**
   * Removes event listener from window object for the API navigation event.
   */
  [unregisterNavigationEvents](): void;

  /**
   * Handler for the API navigation event.
   * 
   * Note, when the current type is set to `operation` then the `operationId` is
   * set instead of `domainId`, which is set to the parent endpoint id.
   */
  [navigationHandler](e: ApiNavigationEvent): void;

  processGraph(): Promise<void>;

  /**
   * Processes selection for the web API data model. It ignores the input if
   * `domainId` or `domainType` is not set.
   * 
   * @param model WebApi AMF model. Do not use an array here.
   */
  [processApiSpecSelection](): void;

  /**
   * Processes selection for a library data model. It ignores the input if
   * `domainId` or `domainType` is not set.
   * @param model Library AMF model. Do not use an array here.
   */
  [processLibrarySelection](): void;

  /**
   * Processes fragment model and sets current selection and the model.
   * 
   * @param model RAML fragment model
   * @param domainType The selected domain type.
   */
  [processFragment](domainType: SelectionType): void;

  /**
   * Sets the partial model to be rendered.
   * 
   * @param model RAML partial model
   * @param domainType The domain type representing the partial model.
   */
  [processPartial](domainType: SelectionType): void;

  /**
   * Processes endpoint data from partial model definition.
   * It sets models that are used by the docs.
   *
   * If `selected` or `selectedType` is not set then it automatically selects
   * an endpoint.
   */
  [processEndpointPartial](): void;

  [serversCountHandler](e: CustomEvent): void;
  [serverChangeHandler](e: CustomEvent): void;

  render(): TemplateResult;

  /**
   * @returns The template for the server selector.
   */
  [serverSelectorTemplate](): TemplateResult|string;

  /**
   * @returns The template for the server selector.
   */
  [modelTemplate](): TemplateResult|string;

  /**
   * @returns The template for the API summary page.
   */
  [summaryTemplate](): TemplateResult|string;

  /**
   * @returns The template for the API security definition page.
   */
  [securityTemplate](): TemplateResult|string;
  /**
   * @returns The template for the RAML's documentation page.
   */
  [documentationTemplate](): TemplateResult|string;

  /**
   * @returns The template for the API schema page.
   */
  [schemaTemplate](): TemplateResult|string;

  /**
   * @returns The template for the API endpoint page.
   */
  [resourceTemplate](): TemplateResult|string;
}
