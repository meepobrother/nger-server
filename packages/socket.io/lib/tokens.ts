import { InjectionToken } from "@nger/core";
import { ServerOptions } from "socket.io";
export const SERVER_SOCKET_IO = new InjectionToken(
  `@nger/server-socket.io SERVER_SOCKET_IO`
);
export const SERVER_SOCKET_IO_OPTIONS = new InjectionToken<ServerOptions>(
  `@nger/server-socket.io SERVER_SOCKET_IO_OPTIONS`
);
