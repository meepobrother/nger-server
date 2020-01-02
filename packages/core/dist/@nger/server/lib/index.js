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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = require("./tokens");
const core_1 = require("@nger/core");
const http_1 = require("http");
const rx_store_1 = require("@nger/rx-store");
const action_1 = require("./action");
const v1_1 = __importDefault(require("uuid/v1"));
const reducer = __importStar(require("./reducer"));
let ServerModule = class ServerModule {
};
ServerModule = __decorate([
    core_1.Module({
        imports: [
            rx_store_1.StoreModule.forFeature('server', reducer.reducer)
        ],
        providers: [
            {
                provide: tokens_1.SERVER,
                useFactory: (injector) => {
                    return http_1.createServer((req, res) => {
                        const store = injector.get(rx_store_1.Store);
                        store.dispatch(action_1.requestStartAction({
                            id: v1_1.default(),
                            req,
                            res,
                            time: new Date().getTime()
                        }));
                    });
                },
                deps: [core_1.Injector]
            }
        ]
    })
], ServerModule);
exports.ServerModule = ServerModule;
__export(require("./tokens"));
