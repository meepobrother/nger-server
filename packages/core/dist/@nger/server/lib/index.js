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
const tokens_1 = require("./tokens");
const core_1 = require("@nger/core");
const http_1 = require("http");
let ServerModule = class ServerModule {
};
ServerModule = __decorate([
    core_1.Module({
        providers: [
            {
                provide: tokens_1.SERVER,
                useFactory: (injector) => {
                    const listener = injector.get(tokens_1.SERVER_LISTENER, null);
                    return http_1.createServer((req, res) => {
                        if (listener)
                            listener(req, res);
                    });
                },
                deps: [core_1.Injector]
            }
        ]
    })
], ServerModule);
exports.ServerModule = ServerModule;
__export(require("./tokens"));
