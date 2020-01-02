import { Module, Injector, ModuleWithProviders, InjectionToken } from "@nger/core";
import { SERVER_WS, SERVER_WS_OPTIONS } from "./tokens";
import { SERVER } from "@nger/server";
import { Server, ServerOptions, Data } from "ws";
import { StoreModule, Store } from '@nger/rx-store'
import { connectionAction, closeAction, messageAction, WsConnectionStatus } from "./action";
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
          let id = uuidv1()
          store.dispatch(connectionAction({
            id: id,
            socket,
            req,
            time: new Date().getTime(),
            status: WsConnectionStatus.Open
          }))
          socket.on('close', () => {
            store.dispatch(closeAction({
              id: id,
              status: WsConnectionStatus.Close
            }))
          })
          socket.on('error', () => {
            store.dispatch(closeAction({
              id: id,
              status: WsConnectionStatus.Error
            }))
          })
          socket.on('message', (data: Data) => {
            store.dispatch(messageAction({
              id: id,
              data: data
            }))
          })
          socket.on('open', () => {
            store.dispatch(closeAction({
              id: id,
              status: WsConnectionStatus.Open
            }))
          })
          socket.on('ping', () => { })
          socket.on('pong', () => { })
          socket.on('unexpected-response', () => { })
          socket.on('upgrade', () => { })
        });
        app.on('error', (err: Error) => { })
        app.on('listening', () => { })
        app.on('headers', (headers, req) => { })
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
export * from './action';
