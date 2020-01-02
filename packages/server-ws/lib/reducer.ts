import { createReducer, on, Action } from '@nger/rx-store'
import { connectionAction, WsConnection, closeAction, messageAction } from './action'
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
    })),
    on(closeAction, (state, action) => {
        let { list, count } = state;
        list[action.id].status = action.status;
        return {
            list,
            count: count - 1
        };
    }),
    on(messageAction, (state, action) => {
        console.log(action);
        const { list, count } = state;
        list[action.id].data = action.data;
        return state;
    })
)

export function reducer(state: ServerState | undefined, action: Action) {
    return serverReducer(state, action);
}