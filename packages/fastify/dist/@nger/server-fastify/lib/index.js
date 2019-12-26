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
const server_1 = require("@nger/server");
const token_1 = require("./token");
const fastify_1 = __importDefault(require("fastify"));
const core_1 = require("@nger/core");
let FastifyServerModule = class FastifyServerModule {
};
FastifyServerModule = __decorate([
    core_1.Module({
        providers: [
            {
                provide: token_1.SERVER_FASTIFY,
                useFactory: (injector) => {
                    const options = injector.get(token_1.SERVER_FASTIFY_OPTIONS, null);
                    const middlewares = injector.get(token_1.SERVER_FASTIFY_MIDDLEWARE, []);
                    const plugins = injector.get(token_1.SERVER_FASTIFY_PLUGIN, []);
                    options.serverFactory = () => {
                        return injector.get(server_1.SERVER);
                    };
                    const app = fastify_1.default(options);
                    middlewares.map(middleware => app.use(middleware));
                    plugins.map(plugin => app.register(plugin));
                    return app;
                },
                deps: [core_1.Injector]
            }
        ]
    })
], FastifyServerModule);
exports.FastifyServerModule = FastifyServerModule;
__export(require("./token"));
