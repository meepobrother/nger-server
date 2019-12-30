"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = require("./tokens");
const core_1 = require("@nger/core");
const http_1 = require("http");
const http_2 = require("@nger/http");
let ServerModule = class ServerModule {
};
ServerModule = __decorate([
    core_1.Module({
        providers: [
            {
                provide: tokens_1.SERVER,
                useFactory: (injector) => {
                    const listener = injector.get(tokens_1.SERVER_LISTENER, null);
                    return http_1.createServer((req, res) => {
                        if (listener)
                            listener(req, res);
                    });
                },
                deps: [core_1.Injector]
            },
            {
                provide: tokens_1.SERVER_LISTENER,
                useFactory: (injector) => (req, res) => {
                    let data = Buffer.from(``);
                    let isHandler = false;
                    req.on('close', () => {
                        if (isHandler)
                            return;
                        isHandler = true;
                        sendRequest(data);
                    });
                    req.on('data', (chunk) => {
                        data = Buffer.concat([data, chunk]);
                    });
                    req.on('end', () => {
                        if (isHandler)
                            return;
                        isHandler = true;
                        sendRequest(data);
                    });
                    req.on('error', (err) => {
                        res.statusCode = 500;
                        res.statusMessage = err.message;
                        res.end();
                    });
                    function sendRequest(data) {
                        const dataStr = data.toString('utf8');
                        let dataObj;
                        try {
                            dataObj = JSON.parse(dataStr);
                        }
                        catch (e) {
                            dataObj = dataStr;
                        }
                        const request = new http_2.HttpRequest(req.method, req.url, dataObj, {
                            headers: new http_2.HttpHeaders(req.headers)
                        });
                        const client = injector.get(http_2.HttpClient);
                        res.setDefaultEncoding('utf8');
                        res.setTimeout(60 * 60 * 3);
                        client.request(request).subscribe(response => {
                            if (response instanceof http_2.HttpResponse) {
                                response.headers.forEach((key, val) => {
                                    res.setHeader(key, val);
                                });
                                res.statusCode = 200;
                                if (typeof response.body === 'object') {
                                    res.write(Buffer.from(JSON.stringify(response.body)));
                                }
                                else if (typeof response.body === 'string' ||
                                    typeof response.body === 'number' ||
                                    typeof response.body === 'boolean' ||
                                    typeof response.body === 'bigint') {
                                    res.write(Buffer.from(`${response.body}`));
                                }
                                else if (Buffer.isBuffer(response.body)) {
                                    res.write(response.body);
                                }
                                else if (Array.isArray(response.body)) {
                                    res.write(Buffer.from(JSON.stringify(response.body)));
                                }
                                else {
                                    res.statusCode = 500;
                                    res.statusMessage = "NOT SUPPORT RESPONSE TYPE";
                                    res.end();
                                }
                            }
                        }, (err) => {
                            res.statusCode = err.status || err.code || 500;
                            res.statusMessage = err.message;
                            res.end();
                        }, () => {
                            res.end();
                        });
                    }
                },
                deps: [core_1.Injector]
            }
        ]
    })
], ServerModule);
exports.ServerModule = ServerModule;
__export(require("./tokens"));
