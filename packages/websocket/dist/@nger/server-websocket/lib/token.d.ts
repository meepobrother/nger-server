import { InjectionToken } from '@nger/core';
import { server, IServerConfig } from "websocket";
export declare const SERVER_WEBSOCKET: InjectionToken<server>;
export declare const SERVER_WEBSOCKET_OPTIONS: InjectionToken<IServerConfig>;
