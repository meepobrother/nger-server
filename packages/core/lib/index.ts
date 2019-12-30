import { SERVER, SERVER_LISTENER } from "./tokens";
import { Module, Injector } from "@nger/core";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@nger/http'
import { takeLast } from 'rxjs/operators'
@Module({
  providers: [
    {
      provide: SERVER,
      useFactory: (injector: Injector) => {
        const listener = injector.get(SERVER_LISTENER, null);
        return createServer((req, res) => {
          if (listener) listener(req, res)
        });
      },
      deps: [Injector]
    },
    {
      provide: SERVER_LISTENER,
      useFactory: (injector: Injector) => (req: IncomingMessage, res: ServerResponse) => {
        let data: Buffer = Buffer.from(``)
        let isHandler: boolean = false;
        req.on('close', () => {
          if (isHandler) return;
          isHandler = true;
          sendRequest(data)
        })
        req.on('data', (chunk: Buffer) => {
          data = Buffer.concat([data, chunk])
        })
        req.on('end', () => {
          if (isHandler) return;
          isHandler = true;
          sendRequest(data)
        })
        req.on('error', (err: Error) => {
          res.statusCode = 500;
          res.statusMessage = err.message
          res.end();
        })
        function sendRequest(data: Buffer) {
          const dataStr = data.toString('utf8')
          let dataObj: any;
          try {
            dataObj = JSON.parse(dataStr)
          } catch (e) {
            dataObj = dataStr;
          }
          const request = new HttpRequest(req.method as any, req.url!, dataObj, {
            headers: new HttpHeaders(req.headers as any)
          })
          const client = injector.get(HttpClient)
          res.setTimeout(60 * 60 * 30)
          let hasSend = false;
          function sendData(data: Buffer) {
            res.write(data)
          }
          client.request(request).pipe(
            takeLast(1)
          ).subscribe(response => {
            if (response instanceof HttpResponse) {
              if (!hasSend) {
                response.headers.forEach((key, val) => {
                  res.setHeader(key, val)
                })
              }
              hasSend = true;
              res.statusCode = 200;
              if (typeof response.body === 'object') {
                const data = Buffer.from(JSON.stringify(response.body))
                sendData(data)
              } else if (
                typeof response.body === 'string' ||
                typeof response.body === 'number' ||
                typeof response.body === 'boolean' ||
                typeof response.body === 'bigint'
              ) {
                const data = Buffer.from(`${response.body}`)
                sendData(data)
              } else if (Buffer.isBuffer(response.body)) {
                const data = response.body;
                sendData(data)
              } else if (Array.isArray(response.body)) {
                const data = Buffer.from(JSON.stringify(response.body))
                sendData(data)
              } else {
                throw new Error(`can not support ${typeof response.body}`)
              }
            }
          }, (err: any) => {
            res.statusCode = err.status || err.code || 500;
            res.statusMessage = `SERVER ERROR`;
            res.end(err.stack);
          }, () => {
            res.statusCode = 200;
            res.statusMessage = 'ok';
            res.end();
          })
        }
      },
      deps: [Injector]
    }
  ]
})
export class ServerModule { }
export * from "./tokens";
