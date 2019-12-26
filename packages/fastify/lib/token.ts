import { InjectionToken } from "@nger/core";
import { FastifyInstance, ServerOptions, Middleware, Plugin } from "fastify";
export const SERVER_FASTIFY = new InjectionToken<FastifyInstance>(
  `SERVER_FASTIFY`
);
export const SERVER_FASTIFY_OPTIONS = new InjectionToken<ServerOptions>(
  `SERVER_FASTIFY_OPTIONS`
);

export const SERVER_FASTIFY_MIDDLEWARE = new InjectionToken<
  Middleware<any, any, any>[]
>(`SERVER_FASTIFY_MIDDLEWARE`);
export const SERVER_FASTIFY_PLUGIN = new InjectionToken<
  Plugin<any, any, any, any, any>[]
>(`SERVER_FASTIFY_PLUGIN`);
