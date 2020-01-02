import { createReducer, on, Action } from '@nger/rx-store'
import { requestStartAction, requestEndAction, RequestStartPayload } from './action'
import { isDevMode } from '@nger/core';
const startTime = new Date().getTime();
export interface AllRequest {
    [key: string]: RequestStartPayload;
}

export interface ServerState {
    count: number;
    list: AllRequest;
}

export const initialState: ServerState = {
    count: 0,
    list: {}
}

export const serverReducer = createReducer(
    initialState,
    on(requestStartAction, (state, action) => ({
        count: state.count + 1,
        list: {
            ...state.list,
            [`${action.id}`]: action
        }
    })),
    on(requestEndAction, (state, action) => {
        const list = state.list;
        let count = state.count;
        const { res, time } = list[action.id]
        res.setHeader(`Handler-Time`, `${new Date().getTime() - time}ms`);
        res.setHeader(`Request-Id`, action.id);
        res.setHeader(`Request-Count`, state.count);
        res.setHeader(`Server-Run-Time`, `${new Date().getTime() - startTime}ms`)
        res.setHeader(`Server-Time`, `${new Date().getTime()}`)
        res.write(Buffer.from(action.body))
        res.statusCode = action.status || 200;
        res.statusMessage = action.statusMessage || 'OK';
        res.end();
        const isDev = isDevMode();
        if (!isDev) {
            delete list[action.id];
            count = count - 1;
        }
        return {
            count,
            list: {
                ...list
            }
        }
    })
)

export function reducer(state: ServerState | undefined, action: Action) {
    return serverReducer(state, action);
}