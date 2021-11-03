import { TemplateResult, LitElement } from 'lit-element';
import { ApiParametrizedSecurityScheme, ApiSecurityRequirement, } from '../helpers/api';
import { Oauth2Credentials } from '@advanced-rest-client/base';
import { RequestAuthorization } from '@advanced-rest-client/events/src/request/ArcRequest';
import { default as ApiAuthorizationMethodElement } from './ApiAuthorizationMethodElement';

declare interface SecurityMethods {
  types: string[];
  schemes: ApiParametrizedSecurityScheme[];
}

export const querySecurity: unique symbol;
export const securityValue: unique symbol;
export const processModel: unique symbol;
export const methodsValue: unique symbol;
export const computeMethods: unique symbol;
export const listSchemeLabels: unique symbol;
export const methodTemplate: unique symbol;
export const apiKeyTemplate: unique symbol;
export const oa2AuthTemplate: unique symbol;
export const oa1AuthTemplate: unique symbol;
export const bearerAuthTemplate: unique symbol;
export const basicAuthTemplate: unique symbol;
export const digestAuthTemplate: unique symbol;
export const passThroughAuthTemplate: unique symbol;
export const ramlCustomAuthTemplate: unique symbol;
export const methodTitleTemplate: unique symbol;
export const changeHandler: unique symbol;
export const createSettings: unique symbol;

export default class ApiAuthorizationEditorElement extends LitElement {
  security: ApiSecurityRequirement;
  /**
   * Current HTTP method. Passed by digest method.
   * @attribute
   */
  httpMethod: string;
  /**
   * Current request URL. Passed by digest method.
   * @attribute
   */
  requestUrl: string;
  /**
   * Current request body. Passed by digest method.
   * @attribute
   */
  requestBody: string;
  /**
  * Whether or not the element is invalid. The validation state changes
  * when settings change or when the `validate()` function is called.
  * @attribute
  */
  invalid: boolean;
  /**
  * List of credentials source
  */
  credentialsSource: Oauth2Credentials[];
  /**
  * Redirect URL for the OAuth2 authorization.
  * @attribute
  */
  oauth2RedirectUri: string;
  /** 
  * When set it overrides the `authorizationUri` in the authorization editor,
  * regardless to the authorization scheme applied to the request.
  * This is to be used with the mocking service.
  * @attribute
  */
  oauth2AuthorizationUri: string;
  /** 
  * When set it overrides the `authorizationUri` in the authorization editor,
  * regardless to the authorization scheme applied to the request.
  * This is to be used with the mocking service.
  * @attribute
  */
  oauth2AccessTokenUri: string;
  /** 
   * Enables Anypoint platform styles.
   * @attribute
   */
  anypoint: boolean;
  /** 
   * Enabled Material Design outlined theme
   * @attribute
   */
  outlined: boolean;
  /**
  * By default the element stores user input in a map that is associated with the specific
  * instance of this element. This way the element can be used multiple times in the same document.
  * However, this way parameter values generated by the generators or entered by the user won't
  * get populated in different operations.
  *
  * By setting this value the element prefers a global cache for values. Once the user enter
  * a value it is registered in the global cache and restored when the same parameter is used again.
  *
  * Do not use this option when the element is embedded multiple times in the page. It will result
  * in generating request data from the cache and not what's in the form inputs and these may not be in sync.
  *
  * These values are stored in memory only. Listen to the `change` event to learn that something changed.
  * @attribute
  */
  globalCache: boolean;

  [securityValue]: ApiSecurityRequirement;
  [methodsValue]: SecurityMethods;

  constructor();

  /**
   * Reads list of authorization methods from the model.
   */
  [processModel](): void;

  /**
   * Computes list of security schemes that can be applied to the element.
   *
   * @param schemes A list of security schemes to process.
   * @returns A list of authorization methods that can be applied to
   * the current endpoint. Each object describes the list of security types
   * that can be applied to the editor. In OAS an auth method may be an union
   * of methods.
   */
  [computeMethods](schemes: ApiParametrizedSecurityScheme[]): SecurityMethods;

  /**
   * Reads authorization scheme's name and type from the AMF model.
   */
  [listSchemeLabels](security: ApiParametrizedSecurityScheme): string|undefined;

  /**
   * A function called each time anything change in the editor.
   * Revalidates the component and dispatches the `change` event.
   */
  [changeHandler](): void;

  /**
   * Validates state of the editor. It sets `invalid` property when called.
   *
   * Exception: OAuth 2 form reports valid even when the `accessToken` is not
   * set. This adjust for this and reports invalid when `accessToken` for OAuth 2
   * is missing.
   *
   * @returns True when the form has valid data.
   */
  validate(): boolean;

  /**
   * Creates a list of configuration by calling the `serialize()` function on each
   * currently rendered authorization form.
   *
   * @returns List of authorization settings.
   */
  serialize(): RequestAuthorization[];

  /**
   * Creates an authorization settings object for passed authorization panel.
   * @param target api-authorization-method instance
   */
  [createSettings](target: ApiAuthorizationMethodElement): RequestAuthorization;

  /**
   * Calls the `authorize()` function on each rendered authorization methods.
   * Currently only `OAuth 1.0` and `OAuth 2.0` actually perform the authorization. 
   * 
   * Each method is called in order to make sure the user is not overwhelmed with 
   * dialogs or other UI elements.
   * 
   * The function rejects when at least one authorization method rejects.
   */
  authorize(): Promise<void>;

  render(): TemplateResult;

  [methodTemplate](scheme: ApiParametrizedSecurityScheme, type: string): TemplateResult|string;

  /**
   * Renders title to be rendered above authorization method
   * @param scheme Authorization scheme to be applied to the method
   */
  [methodTitleTemplate](scheme: ApiParametrizedSecurityScheme): TemplateResult|string;

  /**
   * Renders a template for Basic authorization.
   *
   * @param security Security scheme
   */
  [basicAuthTemplate](security: ApiParametrizedSecurityScheme): TemplateResult;

  /**
   * Renders a template for Digest authorization.
   *
   * @param security Security scheme
   */
  [digestAuthTemplate](security: ApiParametrizedSecurityScheme, renderTitle?: boolean): TemplateResult;

  /**
   * Renders a template for Pass through authorization.
   *
   * @param security Security scheme
   */
  [passThroughAuthTemplate](security: ApiParametrizedSecurityScheme, renderTitle?: boolean): TemplateResult;

  /**
   * Renders a template for RAML custom authorization.
   *
   * @param security Security scheme
   */
  [ramlCustomAuthTemplate](security: ApiParametrizedSecurityScheme): TemplateResult;

  /**
   * Renders a template for Bearer authorization (OAS).
   *
   * @param security Security scheme
   */
  [bearerAuthTemplate](security: ApiParametrizedSecurityScheme, renderTitle?: boolean): TemplateResult;

  /**
   * Renders a template for OAuth 1 authorization.
   *
   * @param security Security scheme
   */
  [oa1AuthTemplate](security: ApiParametrizedSecurityScheme, renderTitle?: boolean): TemplateResult;

  /**
   * Renders a template for OAuth 2 authorization.
   *
   * @param security Security scheme
   */
  [oa2AuthTemplate](security: ApiParametrizedSecurityScheme): TemplateResult;

  /**
   * Renders a template for Api Keys authorization.
   *
   * @param security Security scheme
   */
  [apiKeyTemplate](security: ApiParametrizedSecurityScheme): TemplateResult;
}
