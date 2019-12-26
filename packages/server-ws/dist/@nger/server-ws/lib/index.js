"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nger/core");
const tokens_1 = require("./tokens");
const server_1 = require("@nger/server");
const ws_1 = require("ws");
let WsServerModule = class WsServerModule {
};
WsServerModule = __decorate([
    core_1.Module({
        providers: [
            {
                provide: tokens_1.SERVER_WS,
                useFactory: (injector) => {
                    const server = injector.get(server_1.SERVER);
                    return new ws_1.Server({ server });
                },
                deps: [core_1.Injector]
            }
        ]
    })
], WsServerModule);
exports.WsServerModule = WsServerModule;
__export(require("./tokens"));
