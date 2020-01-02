import { Module, Injector, ModuleWithProviders, InjectionToken } from "@nger/core";
import { SERVER_WS, SERVER_WS_OPTIONS } from "./tokens";
import { SERVER } from "@nger/server";
import { Server, ServerOptions } from "ws";
import { StoreModule, Store } from '@nger/rx-store'
import { connectionAction } from "./action";
import uuidv1 from 'uuid/v1'
import * as reducer from './reducer'
@Module({
  imports: [
    StoreModule.forFeature(`@nger/server-ws`, reducer.reducer)
  ],
  providers: [
    {
      provide: SERVER_WS,
      useFactory: (injector: Injector) => {
        const server = injector.get(SERVER);
        const options = injector.get(SERVER_WS_OPTIONS, {});
        const app = new Server({ ...options, server });
        const store = injector.get(Store)
        app.on('connection', (socket, req) => {
          store.dispatch(connectionAction({
            id: uuidv1(),
            socket,
            req,
            time: new Date().getTime()
          }))
        });
        return app;
      },
      deps: [Injector]
    }
  ]
})
export class ServerWsModule {
  static forRoot(options: ServerOptions | InjectionToken<ServerOptions>): ModuleWithProviders {
    return {
      ngModule: ServerWsModule,
      providers: [{
        provide: SERVER_WS_OPTIONS,
        useFactory: (injector: Injector) => {
          return options instanceof InjectionToken ? injector.get(options) : options;
        },
        deps: [Injector]
      }]
    }
  }
}
export * from './tokens';