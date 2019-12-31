import { ServerWsModule, SERVER_WS } from '../lib'
import { Module, corePlatform } from '@nger/core'
import { ServerModule, SERVER } from '@nger/server'
import WebSocket from 'ws'
@Module({
    imports: [
        ServerModule,
        ServerWsModule
    ]
})
export class AppModule {

}

corePlatform()
    .bootstrapModule(AppModule)
    .then(res => {
        const ws = res.get(SERVER_WS)
        const server = res.get(SERVER)
        server.listen(9008)

        const socket = new WebSocket(`ws:localhost:9008`)
        socket.on('message', (data: any) => {
            debugger;
        })
    });

