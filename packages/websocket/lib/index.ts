import { SERVER } from "@nger/server";
import { Module, Injector } from "@nger/core";
import { server as WebsocketServer } from "websocket";
import { SERVER_WEBSOCKET, SERVER_WEBSOCKET_OPTIONS } from "./token";
@Module({
  providers: [
    {
      provide: SERVER_WEBSOCKET,
      useFactory: (injector: Injector) => {
        const server = injector.get(SERVER);
        const options = injector.get(SERVER_WEBSOCKET_OPTIONS);
        return new WebsocketServer({
          ...options,
          httpServer: server
        });
      },
      deps: [Injector]
    }
  ]
})
export class WebsocketServerModule {}
