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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = require("./tokens");
const express_1 = __importDefault(require("express"));
const core_1 = require("@nger/core");
const server_1 = require("@nger/server");
let ServerExpressModule = class ServerExpressModule {
};
ServerExpressModule = __decorate([
    core_1.Module({
        providers: [
            {
                provide: tokens_1.SERVER_EXPRESS,
                useFactory: (injector) => {
                    const handlers = injector.get(tokens_1.SERVER_EXPRESS_HANDLER, []);
                    const app = express_1.default();
                    app.use(...handlers);
                    return app;
                },
                deps: [core_1.Injector]
            },
            {
                provide: server_1.SERVER_LISTENER,
                useExisting: tokens_1.SERVER_EXPRESS
            }
        ]
    })
], ServerExpressModule);
exports.ServerExpressModule = ServerExpressModule;
__export(require("./tokens"));
