"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nger/core");
const rx_effects_1 = require("@nger/rx-effects");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
const action_1 = require("../lib/action");
let DemoEffects = class DemoEffects {
    constructor(actions$) {
        this.actions$ = actions$;
        this.logActions$ = rx_effects_1.createEffect(() => this.actions$.pipe(rx_effects_1.ofType(action_1.requestStartAction), operators_1.exhaustMap((action) => {
            let _action = action;
            return rxjs_1.of(action_1.requestEndAction({
                id: _action.id,
                body: `hello world - ${new Date().getTime() - _action.time}`,
                status: 200,
                statusMessage: 'ok'
            }));
        })));
    }
};
DemoEffects = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [rx_effects_1.Actions])
], DemoEffects);
exports.DemoEffects = DemoEffects;
