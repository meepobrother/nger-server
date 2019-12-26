import { InjectionToken } from "@nger/core";
import { Server, RequestListener } from "http";
export const SERVER = new InjectionToken<Server>(`@nger/server SERVER`);
export const SERVER_LISTENER = new InjectionToken<RequestListener>(`@nger/server SERVER_LISTENER`);
