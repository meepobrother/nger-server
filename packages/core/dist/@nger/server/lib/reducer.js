"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rx_store_1 = require("@nger/rx-store");
const action_1 = require("./action");
const core_1 = require("@nger/core");
const startTime = new Date().getTime();
exports.initialState = {
    count: 0,
    list: {}
};
exports.serverReducer = rx_store_1.createReducer(exports.initialState, rx_store_1.on(action_1.requestStartAction, (state, action) => ({
    count: state.count + 1,
    list: {
        ...state.list,
        [`${action.id}`]: action
    }
})), rx_store_1.on(action_1.requestEndAction, (state, action) => {
    const list = state.list;
    let count = state.count;
    const { res, time } = list[action.id];
    res.setHeader(`Handler-Time`, `${new Date().getTime() - time}ms`);
    res.setHeader(`Request-Id`, action.id);
    res.setHeader(`Request-Count`, state.count);
    res.setHeader(`Server-Run-Time`, `${new Date().getTime() - startTime}ms`);
    res.write(Buffer.from(action.body));
    res.statusCode = action.status || 200;
    res.statusMessage = action.statusMessage || 'OK';
    res.end();
    const isDev = core_1.isDevMode();
    if (!isDev) {
        delete list[action.id];
        count = count - 1;
    }
    return {
        count,
        list: {
            ...list
        }
    };
}));
function reducer(state, action) {
    return exports.serverReducer(state, action);
}
exports.reducer = reducer;
