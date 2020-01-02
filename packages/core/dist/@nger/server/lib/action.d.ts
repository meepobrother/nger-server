/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
export interface RequestStartPayload {
    id: string;
    req: IncomingMessage;
    res: ServerResponse;
    time: number;
}
export interface RequestEndPayload {
    id: string;
    body: string;
    status?: number;
    statusMessage?: string;
    headers?: any;
}
export declare const requestStartAction: import("@nger/rx-store").ActionCreator<"[@nger/server] requestAction", (props: RequestStartPayload) => RequestStartPayload & import("@nger/rx-store/lib/models").TypedAction<"[@nger/server] requestAction">>;
export declare const requestEndAction: import("@nger/rx-store").ActionCreator<"[@nger/server] requestEndAction", (props: RequestEndPayload) => RequestEndPayload & import("@nger/rx-store/lib/models").TypedAction<"[@nger/server] requestEndAction">>;
