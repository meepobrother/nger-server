import { createAction, props } from '@nger/rx-store'
import { IncomingMessage, ServerResponse } from 'http'
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
export const requestStartAction = createAction(`[@nger/server] requestAction`, props<RequestStartPayload>());
export const requestEndAction = createAction(`[@nger/server] requestEndAction`, props<RequestEndPayload>());
