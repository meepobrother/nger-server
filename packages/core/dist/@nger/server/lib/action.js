"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rx_store_1 = require("@nger/rx-store");
exports.requestStartAction = rx_store_1.createAction(`[@nger/server] requestAction`, rx_store_1.props());
exports.requestEndAction = rx_store_1.createAction(`[@nger/server] requestEndAction`, rx_store_1.props());
