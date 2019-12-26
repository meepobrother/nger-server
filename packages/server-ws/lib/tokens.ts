import { InjectionToken } from '@nger/core';
import { Server } from 'ws'
export const SERVER_WS = new InjectionToken<Server>(`SERVER_WS`)
