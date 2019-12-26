import { InjectionToken } from "@nger/core";
import { Application, RequestHandler } from "express";
export const SERVER_EXPRESS = new InjectionToken<Application>(`SERVER_EXPRESS`);
export const SERVER_EXPRESS_HANDLER = new InjectionToken<RequestHandler[]>(
  `SERVER_EXPRESS_ROUTER`
);
