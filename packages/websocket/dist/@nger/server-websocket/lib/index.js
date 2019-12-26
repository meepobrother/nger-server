"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@nger/server");
const core_1 = require("@nger/core");
const websocket_1 = require("websocket");
const token_1 = require("./token");
let WebsocketServerModule = class WebsocketServerModule {
};
WebsocketServerModule = __decorate([
    core_1.Module({
        providers: [
            {
                provide: token_1.SERVER_WEBSOCKET,
                useFactory: (injector) => {
                    const server = injector.get(server_1.SERVER);
                    const options = injector.get(token_1.SERVER_WEBSOCKET_OPTIONS);
                    return new websocket_1.server({
                        ...options,
                        httpServer: server
                    });
                },
                deps: [core_1.Injector]
            }
        ]
    })
], WebsocketServerModule);
exports.WebsocketServerModule = WebsocketServerModule;
