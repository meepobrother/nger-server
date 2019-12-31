import { InjectionToken } from '@nger/core';
import { Server, ServerOptions } from 'ws'
export const SERVER_WS = new InjectionToken<Server>(`SERVER_WS`)
export const SERVER_WS_OPTIONS = new InjectionToken<ServerOptions>(`SERVER_OPTIONS`)
