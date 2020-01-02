import { createAction, props } from '@nger/rx-store'
import WebSocket, { Data } from 'ws';
import { IncomingMessage } from 'http';
export enum WsConnectionStatus{
    Open = 1,
    Close = 2,
    Error = 3
}
export interface WsConnection {
    id: string;
    socket: WebSocket;
    req: IncomingMessage;
    time: number;
    status: WsConnectionStatus;
    data?: Data
}
export const connectionAction = createAction(
    `[@nger/server-ws] connectionAction`,
    props<WsConnection>()
)
export interface ClosePlayload {
    id: string;
    status: WsConnectionStatus
}
export const closeAction = createAction(
    `[@nger/server-ws] closeAction`,
    props<ClosePlayload>()
)

export interface MessagePayload {
    id: string;
    data: Data;
}
export const messageAction = createAction(
    `[@nger/server-ws] messageAction`,
    props<MessagePayload>()
)