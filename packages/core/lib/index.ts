import { SERVER, SERVER_LISTENER } from "./tokens";
import { Module, Injector } from "@nger/core";
import { createServer } from "http";
@Module({
  providers: [
    {
      provide: SERVER,
      useFactory: (injector: Injector) => {
        const listener = injector.get(SERVER_LISTENER, null);
        return createServer((req, res) => {
          if (listener) listener(req, res)
        });
      },
      deps: [Injector]
    }
  ]
})
export class ServerModule { }
export * from "./tokens";
