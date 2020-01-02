import { createAction, props } from '@nger/rx-store'
import WebSocket from 'ws';
import { IncomingMessage } from 'http';
export interface WsConnection {
    id: string;
    socket: WebSocket;
    req: IncomingMessage;
    time: number;
}
export const connectionAction = createAction(
    `[@nger/server-ws] connectionAction`,
    props<WsConnection>()
)
