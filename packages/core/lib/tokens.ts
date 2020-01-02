import { InjectionToken } from "@nger/core";
import { Server } from "http";
export const SERVER = new InjectionToken<Server>(`@nger/server SERVER`);
