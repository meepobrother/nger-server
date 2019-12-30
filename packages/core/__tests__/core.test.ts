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
import { HttpNodeModule } from '@nger/http-node';
import { ServerModule, SERVER } from '../lib';
import { of } from 'rxjs';

@Controller({
  path: '/',
  providers: []
})
export class DemoController {
  @Get(`add`)
  add(@Cookies(`username`) username: string) {
    return of({ username: username || 'username' })
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
    HttpNodeModule
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
