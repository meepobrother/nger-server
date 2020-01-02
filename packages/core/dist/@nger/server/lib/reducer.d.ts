import { Action } from '@nger/rx-store';
import { RequestStartPayload } from './action';
export interface AllRequest {
    [key: string]: RequestStartPayload;
}
export interface ServerState {
    count: number;
    list: AllRequest;
}
export declare const initialState: ServerState;
export declare const serverReducer: import("@nger/rx-store").ActionReducer<ServerState, Action>;
export declare function reducer(state: ServerState | undefined, action: Action): ServerState;
