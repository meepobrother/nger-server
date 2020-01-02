"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nger/core");
const lib_1 = require("../lib");
const rx_store_1 = require("@nger/rx-store");
const rx_effects_1 = require("@nger/rx-effects");
const effects_1 = require("./effects");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.Module({
        imports: [
            rx_store_1.StoreModule.forRoot(),
            rx_effects_1.EffectsModule.forRoot([
                effects_1.DemoEffects
            ]),
            lib_1.ServerModule
        ]
    })
], AppModule);
exports.AppModule = AppModule;
core_1.setDevMode(true);
core_1.corePlatform()
    .bootstrapModule(AppModule)
    .then(res => {
    const store = res.get(rx_store_1.Store);
    store.subscribe(res => {
        console.log(res);
    });
    const server = res.get(lib_1.SERVER);
    server.listen(9000, '0.0.0.0', () => {
        console.log(`app ready`);
    });
});
