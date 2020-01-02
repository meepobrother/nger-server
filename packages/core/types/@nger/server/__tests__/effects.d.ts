import { Actions } from '@nger/rx-effects';
export declare class DemoEffects {
    private actions$;
    constructor(actions$: Actions);
    logActions$: import("rxjs").Observable<import("../lib/action").RequestEndPayload & import("@nger/rx-store/lib/models").TypedAction<"[@nger/server] requestEndAction">> & import("@nger/rx-effects").CreateEffectMetadata;
}
