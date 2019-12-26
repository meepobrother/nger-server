import { InjectionToken } from '@nger/core'
import { server, IServerConfig } from "websocket";
export const SERVER_WEBSOCKET = new InjectionToken<server>(`SERVER_WEBSOCKET`)
export const SERVER_WEBSOCKET_OPTIONS = new InjectionToken<IServerConfig>(`SERVER_WEBSOCKET_OPTIONS`)