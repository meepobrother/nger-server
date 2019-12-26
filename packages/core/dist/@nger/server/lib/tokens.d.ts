/// <reference types="node" />
import { InjectionToken } from "@nger/core";
import { Server, RequestListener } from "http";
export declare const SERVER: InjectionToken<Server>;
export declare const SERVER_LISTENER: InjectionToken<RequestListener>;
