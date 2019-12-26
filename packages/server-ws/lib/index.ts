import { Module, Injector } from "@nger/core";
import { SERVER_WS } from "./tokens";
import { SERVER } from "@nger/server";
import { Server } from "ws";
@Module({
  providers: [
    {
      provide: SERVER_WS,
      useFactory: (injector: Injector) => {
        const server = injector.get(SERVER);
        return new Server({ server });
      },
      deps: [Injector]
    }
  ]
})
export class WsServerModule {}
export * from './tokens';