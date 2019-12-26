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
const core_1 = require("@nger/core");
const server_1 = require("@nger/server");
const socket_io_1 = __importDefault(require("socket.io"));
const tokens_1 = require("./tokens");
let SocketIoServerModule = class SocketIoServerModule {
};
SocketIoServerModule = __decorate([
    core_1.Module({
        imports: [],
        providers: [
            {
                provide: tokens_1.SERVER_SOCKET_IO,
                useFactory: (injector) => {
                    const server = injector.get(server_1.SERVER);
                    const options = injector.get(tokens_1.SERVER_SOCKET_IO_OPTIONS, null);
                    return socket_io_1.default(server, options);
                },
                deps: [core_1.Injector]
            }
        ]
    })
], SocketIoServerModule);
exports.SocketIoServerModule = SocketIoServerModule;
__export(require("./tokens"));
