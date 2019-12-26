import { InjectionToken } from "@nger/core";
import { Application, RequestHandler } from "express";
export declare const SERVER_EXPRESS: InjectionToken<Application>;
export declare const SERVER_EXPRESS_HANDLER: InjectionToken<RequestHandler<import("express-serve-static-core").ParamsDictionary>[]>;
