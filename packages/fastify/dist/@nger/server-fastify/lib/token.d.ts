/// <reference types="node" />
import { InjectionToken } from "@nger/core";
import { FastifyInstance, ServerOptions, Middleware } from "fastify";
export declare const SERVER_FASTIFY: InjectionToken<FastifyInstance<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse>>;
export declare const SERVER_FASTIFY_OPTIONS: InjectionToken<ServerOptions>;
export declare const SERVER_FASTIFY_MIDDLEWARE: InjectionToken<Middleware<any, any, any>[]>;
export declare const SERVER_FASTIFY_PLUGIN: InjectionToken<(((instance: FastifyInstance<any, any, any>, options: any) => Promise<void>) | ((instance: FastifyInstance<any, any, any>, options: any, callback: (err?: import("fastify").FastifyError | undefined) => void) => void))[]>;
