import { SERVER } from "./tokens";
import { Module, Injector } from "@nger/core";
import { createServer } from "http";
import { StoreModule, Store } from '@nger/rx-store';
import { requestStartAction } from "./action";
import uuidv1 from 'uuid/v1';
import * as reducer from "./reducer";
@Module({
  imports: [
    StoreModule.forFeature('server', reducer.reducer)
  ],
  providers: [
    {
      provide: SERVER,
      useFactory: (injector: Injector) => {
        return createServer((req, res) => {
          const store = injector.get(Store)
          store.dispatch(requestStartAction({
            id: uuidv1(),
            req,
            res,
            time: new Date().getTime()
          }));
        });
      },
      deps: [Injector]
    }
  ]
})
export class ServerModule { }
export * from "./tokens";
