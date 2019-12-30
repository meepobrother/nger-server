import { REQUEST, HttpClient, RESPONSE } from "@nger/http";
import { SERVER_EXPRESS, SERVER_EXPRESS_HANDLER } from "./tokens";
import express from "express";
import {
  Module,
  Injector,
  ModuleWithProviders,
  APP_INITIALIZER,
  HttpRequest,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from "@nger/core";
import { SERVER_LISTENER } from "@nger/server";
import bodyParser from "body-parser";
import cors from "cors";

@Module({
  providers: [
    {
      provide: SERVER_EXPRESS_HANDLER,
      useValue: bodyParser.urlencoded({ extended: false }),
      multi: true
    },
    {
      provide: SERVER_EXPRESS_HANDLER,
      useValue: bodyParser.json(),
      multi: true
    },
    {
      provide: SERVER_EXPRESS_HANDLER,
      useValue: cors({
        origin: true,
        methods: ["*"],
        allowedHeaders: ["*"],
        exposedHeaders: ["*"],
        credentials: true,
        maxAge: 60 * 60 * 30,
        preflightContinue: true,
        optionsSuccessStatus: 200
      }),
      multi: true
    },
    {
      provide: SERVER_EXPRESS,
      useFactory: (injector: Injector) => {
        const handlers = injector.get(SERVER_EXPRESS_HANDLER, []);
        const app = express();
        app.use(...handlers);
        return app;
      },
      deps: [Injector]
    },
    {
      provide: SERVER_LISTENER,
      useExisting: SERVER_EXPRESS
    }
  ]
})
export class ExpressServerModule {
  static forRoot(port: number, host?: string): ModuleWithProviders {
    return {
      ngModule: ExpressServerModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: (injector: Injector) => {
            return () => {
              const server = injector.get(SERVER_EXPRESS);
              server.use((req, res, next) => {
                const httpRequest = new HttpRequest(
                  req.method as any,
                  req.originalUrl,
                  req.body,
                  {
                    headers: new HttpHeaders(req.headers as any),
                    params: new HttpParams({ fromObject: req.query })
                  }
                );
                const client = injector.get(HttpClient);
                client.request(httpRequest).subscribe(response => {
                  if (response instanceof HttpResponse) {
                    res.status(response.status);
                    res.statusMessage = response.statusText;
                    response.headers.forEach((name, value) =>
                      res.setHeader(name, value)
                    );
                    res.send(response.body || "");
                    console.log(`end`)
                    res.end();
                  }
                });
              });
              server.listen(port, host || "0.0.0.0", () => {
                console.log(`http://${host || "0.0.0.0"}:${port}`);
              });
            };
          },
          multi: true,
          deps: [Injector]
        }
      ]
    };
  }
}
export * from "./tokens";
