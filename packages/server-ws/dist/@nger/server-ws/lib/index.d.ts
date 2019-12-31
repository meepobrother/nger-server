import { ModuleWithProviders, InjectionToken } from "@nger/core";
import { ServerOptions } from "ws";
export declare class ServerWsModule {
    static forRoot(options: ServerOptions | InjectionToken<ServerOptions>): ModuleWithProviders;
}
export * from './tokens';
