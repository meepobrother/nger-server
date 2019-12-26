import {
  SERVER_EXPRESS,
  SERVER_EXPRESS_HANDLER
} from "./tokens";
import express from "express";
import { Module, Injector } from "@nger/core";
import { SERVER_LISTENER } from "@nger/server";
@Module({
  providers: [
    {
      provide: SERVER_EXPRESS,
      useFactory: (injector: Injector) => {
        const handlers = injector.get(SERVER_EXPRESS_HANDLER, []);
        const app = express();
        app.use(...handlers);
        return app;
      },
      deps: [Injector]
    },
    {
      provide: SERVER_LISTENER,
      useExisting: SERVER_EXPRESS
    }
  ]
})
export class ExpressServerModule {}
export * from './tokens'