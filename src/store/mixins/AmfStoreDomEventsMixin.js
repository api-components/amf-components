/* eslint-disable class-methods-use-this */
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { EventsTargetMixin } from  '@anypoint-web-components/awc';
import { EventTypes } from '../../events/EventTypes.js';


export const eventHandler = Symbol('eventHandler');

/**
 * @type {Record<string, { target: string, args?: string[], eventProperties?: boolean, passDetail?: boolean }>}
 */
const eventsMap = {
  [EventTypes.Api.summary]: { target: 'apiSummary' },
  [EventTypes.Api.protocols]: { target: 'apiProtocols' },
  [EventTypes.Api.version]: { target: 'apiVersion' },
  [EventTypes.Api.documentMeta]: { target: 'documentMeta' },
  [EventTypes.Endpoint.get]: { target: 'getEndpoint', args: ['id'], },
  [EventTypes.Endpoint.byPath]: { target: 'getEndpointByPath', args: ['id'], },
  [EventTypes.Endpoint.list]: { target: 'listEndpointsWithOperations' },
  [EventTypes.Operation.get]: { target: 'getOperation', args: ['id', 'parent'] },
  [EventTypes.Operation.getParent]: { target: 'getOperationParent', args: ['id'] },
  [EventTypes.Server.query]: { target: 'queryServers', passDetail: true },
  [EventTypes.Documentation.list]: { target: 'listDocumentations' },
  [EventTypes.Documentation.get]: { args: ['id'], target: 'getDocumentation' },
  [EventTypes.Security.get]: { args: ['id'], target: 'getSecurityScheme' },
  [EventTypes.Security.getRequirement]: { args: ['id'], target: 'getSecurityRequirement' },
  [EventTypes.Security.list]: { target: 'listSecurity' },
  [EventTypes.Request.get]: { args: ['id'], target: 'getRequest', },
  [EventTypes.Response.get]: { args: ['id'], target: 'getResponse', },
  [EventTypes.Payload.get]: { args: ['id'], target: 'getPayload', },
  [EventTypes.Type.list]: { target: 'listTypes' },
  [EventTypes.Type.get]: { args: ['id'], target: 'getType' },
};

/**
 * @param {*} base
 */
const mxFunction = base => {
  class AmfStoreDomEventsMixin extends EventsTargetMixin(base) {
    /**
     * @param {...any} args Base class arguments
     */
    constructor(...args) {
      super(...args);
      this[eventHandler] = this[eventHandler].bind(this);
    }

    /**
     * Listens for the store DOM events.
     * @param {EventTarget} node
     */
    listen(node=window) {
      Object.keys(eventsMap).forEach(type => node.addEventListener(type, this[eventHandler]));
    }

    /**
     * Removes store's DOM events.
     * @param {EventTarget} node
     */
    unlisten(node=window) {
      Object.keys(eventsMap).forEach(type => node.removeEventListener(type, this[eventHandler]));
    }

    /**
     * @param {EventTarget} node
     */
    _attachListeners(node) {
      super._attachListeners(node);
      this.listen(node);
    }

    /**
     * @param {EventTarget} node
     */
    _detachListeners(node) {
      super._detachListeners(node);
      this.unlisten(node);
    }

    /**
     * @param {CustomEvent} e 
     */
    [eventHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const info = eventsMap[e.type];
      if (!info) {
        // eslint-disable-next-line no-console
        console.warn(`Incorrectly handled event ${e.type}`);
        return;
      }
      const { args, target, passDetail } = info;
      if (passDetail) {
        const cp = { ...(e.detail || {}) };
        e.detail.result = this[target](cp);
      } else if (!Array.isArray(args) || !args.length) {
        e.detail.result = this[target]();
      } else {
        const params = [];
        args.forEach(n => {
          const value = info.eventProperties ? e[n] : e.detail[n];
          params.push(value);
        });
        e.detail.result = this[target](...params);
      }
    }
  }
  return AmfStoreDomEventsMixin;
}

/**
 * This mixin adds events listeners for DOM events related to the AMF store.
 * It does not provide implementations for the functions called by each handler.
 * This to be mixed in with an instance of the `AmfStoreService`.
 * 
 * The implementation by default listens on the `window` object.
 * Set `eventsTarget` property to listen to the events on a specific node.
 * 
 * @mixin
 */
export const AmfStoreDomEventsMixin = dedupeMixin(mxFunction);
