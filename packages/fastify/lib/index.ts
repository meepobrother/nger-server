import { SERVER, NgerServer } from "@nger/server";
import {
  SERVER_FASTIFY,
  SERVER_FASTIFY_OPTIONS,
  SERVER_FASTIFY_MIDDLEWARE,
  SERVER_FASTIFY_PLUGIN
} from "./token";
import fastify from "fastify";
import { Module, Injector } from "@nger/core";

@Module({
  providers: [
    {
      provide: SERVER_FASTIFY,
      useFactory: (injector: Injector) => {
        const options = injector.get(SERVER_FASTIFY_OPTIONS, null);
        const middlewares = injector.get(SERVER_FASTIFY_MIDDLEWARE, []);
        const plugins = injector.get(SERVER_FASTIFY_PLUGIN, []);
        options.serverFactory = () => {
          return injector.get(SERVER);
        };
        const app = fastify(options);
        middlewares.map(middleware => app.use(middleware));
        plugins.map(plugin => app.register(plugin));
        return app;
      },
      deps: [Injector]
    }
  ]
})
export class FastifyServerModule {}

export * from './token';