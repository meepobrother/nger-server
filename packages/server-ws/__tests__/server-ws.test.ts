import { ServerWsModule, SERVER_WS } from '../lib'
import { Module, corePlatform, setDevMode } from '@nger/core'
import { ServerModule, SERVER } from '@nger/server'
import WebSocket from 'ws'
import { StoreModule, Store } from '@nger/rx-store'
import { EffectsModule} from '@nger/rx-effects'
import { DemoEffects } from './effects'

setDevMode(true)
@Module({
    imports: [
        StoreModule.forRoot(),
        EffectsModule.forRoot([
            DemoEffects
        ]),
        ServerModule,
        ServerWsModule
    ]
})
export class AppModule {

}

corePlatform()
    .bootstrapModule(AppModule)
    .then(res => {
        const store = res.get(Store)
        store.subscribe(res => console.log(res))
        const ws = res.get(SERVER_WS)
        ws.on('error', () => {
            console.log(`error`)
        });
        const server = res.get(SERVER)
        server.listen(9008, () => {
            console.log(`app server`)
        })
        const socket = new WebSocket(`ws://localhost:9008`)
        socket.on('message', (data: any) => {
            debugger;
        })
    });

