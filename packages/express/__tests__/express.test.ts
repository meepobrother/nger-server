import { ExpressServerModule } from "../lib";
import { Module, corePlatform} from "@nger/core";
import { HttpModule } from '@nger/http'
import { HttpNodeModule } from '@nger/http-node'
@Module({
  imports: [ExpressServerModule.forRoot(9008), HttpModule, HttpNodeModule]
})
export class AppModule {}
corePlatform()
  .bootstrapModule(AppModule)
  .then(ref => {
  });
