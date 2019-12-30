import {
  Cookies
} from "@nger/http";
import {
  corePlatform,
  Module,
  Controller,
} from "@nger/core";
import {
  Get, HttpModule
} from "@nger/http";
import { HttpNodeModule } from '@nger/http-node'
import { ServerModule, SERVER } from '../lib'
import { from, Subject } from 'rxjs'
@Controller({
  path: '/',
  providers: []
})
export class DemoController {
  @Get(`add`)
  add(@Cookies(`username`) username: string) {
    const sub = new Subject();
    sub.next(`add`)
    let i = 0;
    setInterval(() => {
      if (i === 5) {
        sub.complete();
      }
      sub.next(`${++i}`)
    }, 1000)
    return sub;
  }
}

@Module({
  imports: [],
  controllers: [DemoController]
})
export class ChildModule { }

@Module({
  imports: [
    HttpModule,
    ChildModule,
    ServerModule,
    HttpNodeModule,
  ],
  providers: []
})
export class AppModule { }
corePlatform()
  .bootstrapModule(AppModule)
  .then(res => {
    const server = res.get(SERVER)
    server.listen(9000)
  });
