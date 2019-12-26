import { SERVER, SERVER_LISTENER } from "./tokens";
import { Module, Injector } from "@nger/core";
import { createServer } from "http";

@Module({
  providers: [
    {
      provide: SERVER,
      useFactory: (injector: Injector) => {
        const defaultListener = () => {};
        const listener = injector.get(SERVER_LISTENER, defaultListener);
        return createServer(listener);
      },
      deps: [Injector]
    }
  ]
})
export class ServerModule {}

export * from './tokens'