import { createReducer, on, Action } from '@nger/rx-store'
import { connectionAction, WsConnection } from './action'
export interface ServerState {
    count: number;
    list: { [key: string]: WsConnection };
}

export const initialState: ServerState = {
    count: 0,
    list: {}
}

export const serverReducer = createReducer(
    initialState,
    on(connectionAction, (state, action) => ({
        count: state.count + 1,
        list: {
            ...state.list,
            [`${action.id}`]: action
        }
    }))
)

export function reducer(state: ServerState | undefined, action: Action) {
    return serverReducer(state, action);
}