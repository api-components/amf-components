/* eslint-disable max-classes-per-file */
import {EventTypes} from './EventTypes.js';
import { ApiStoreContextEvent } from './BaseEvents.js';

/** @typedef {import('../types').ServerType} ServerType */
/** @typedef {import('../helpers/api').ServersQueryOptions} ServersQueryOptions */
/** @typedef {import('../helpers/api').ApiServer} ApiServer */

/**
 * The event dispatched when a server selection change.
 */
export class ServerChangeEvent extends CustomEvent {
  /**
   * @param {string} value The server id (for listed servers in the model), the URI value (when custom base URI is selected), or the `data-value` of the `anypoint-item` attribute rendered into the extra slot.
   * @param {ServerType} type The changed server type.
   */
  constructor(value, type) {
    super(EventTypes.Server.serverChange, {
      bubbles: true,
      composed: true,
      detail: {
        value, type,
      },
    });
  }
}

/**
 * The event dispatched when a server count change. This happens when the server selector discover a change in the number of available servers.
 */
export class ServerCountChangeEvent extends CustomEvent {
  /**
   * @param {number} count The number of servers rendered in the selector.
   */
  constructor(count) {
    super(EventTypes.Server.serverCountChange, {
      detail: {
        value: count,
      },
    });
  }
}

export const ServerEvents = {
  /** 
   * @param {EventTarget} target The node on which to dispatch the event.
   * @param {string} value The server id (for listed servers in the model), the URI value (when custom base URI is selected), or the `data-value` of the `anypoint-item` attribute rendered into the extra slot.
   * @param {ServerType} type The changed server type.
   * @returns {void}
   */
  serverChange: (target, value, type) => {
    const e = new ServerChangeEvent(value, type);
    target.dispatchEvent(e);
  },
  /** 
   * @param {EventTarget} target The node on which to dispatch the event.
   * @param {number} count The number of servers rendered in the selector.
   * @returns {void}
   */
  serverCountChange: (target, count) => {
    const e = new ServerCountChangeEvent(count);
    target.dispatchEvent(e);
  },
  /**
   * Queries for the list of servers for method, if defined, or endpoint, if defined, or root level 
   * @param {EventTarget} target The node on which to dispatch the event.
   * @param {ServersQueryOptions=} query Server query options
   * @returns {Promise<ApiServer[]>} The list of servers for given query.
   */
  query: (target, query) => {
    const e = new ApiStoreContextEvent(EventTypes.Server.query, query);
    target.dispatchEvent(e);
    return e.detail.result;
  },
};
