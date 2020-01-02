import { corePlatform, Module, setDevMode } from "@nger/core";
import { ServerModule, SERVER } from '../lib';
import { StoreModule, Store } from '@nger/rx-store'
import { EffectsModule } from '@nger/rx-effects'
import { DemoEffects } from "./effects";
@Module({
  imports: [
    StoreModule.forRoot(),
    EffectsModule.forRoot([
      DemoEffects
    ]),
    ServerModule
  ]
})
export class AppModule { }
setDevMode(true)
corePlatform()
  .bootstrapModule(AppModule)
  .then(res => {
    const store = res.get(Store)
    store.subscribe(res => {
      console.log(res)
    })
    const server = res.get(SERVER)
    server.listen(9000, '0.0.0.0', () => {
      console.log(`app ready`)
    })
  });
