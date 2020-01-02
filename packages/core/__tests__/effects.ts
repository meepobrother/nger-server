import { Injectable } from "@nger/core";
import { Actions, createEffect, ofType } from '@nger/rx-effects';
import { exhaustMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { requestEndAction, requestStartAction, RequestStartPayload } from "../lib/action";
@Injectable()
export class DemoEffects {
    constructor(private actions$: Actions) { }
    logActions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestStartAction),
            exhaustMap((action: any) => {
                let _action: RequestStartPayload = action;
                return of(requestEndAction({
                    id: _action.id,
                    body: `hello world - ${new Date().getTime() - _action.time}`,
                    status: 200,
                    statusMessage: 'ok'
                }))
            }))
    );
}