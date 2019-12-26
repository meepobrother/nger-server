import { Module, Injector } from "@nger/core";
import { SERVER } from "@nger/server";
import io from "socket.io";
import { SERVER_SOCKET_IO, SERVER_SOCKET_IO_OPTIONS } from "./tokens";
@Module({
  imports: [],
  providers: [
    {
      provide: SERVER_SOCKET_IO,
      useFactory: (injector: Injector) => {
        const server = injector.get(SERVER);
        const options = injector.get(SERVER_SOCKET_IO_OPTIONS, null);
        return io(server, options);
      },
      deps: [Injector]
    }
  ]
})
export class SocketIoServerModule {}
export * from './tokens';
