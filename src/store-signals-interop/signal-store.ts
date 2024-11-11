import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { signalStore, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Store } from '@ngrx/store';
import { EMPTY, pipe, switchMap } from 'rxjs';
import { CounterService } from './service';
import { actions } from './store';

export const CounterSignalStore = signalStore(
    withMethods((store, counterService = inject(CounterService), ngrxStore = inject(Store)) => ({
        increment: (): void => {
            ngrxStore.dispatch(actions.increment())
        },  
        decrement: (): void => {
            ngrxStore.dispatch(actions.decrement())
        },  
        reset: (): void => {
            ngrxStore.dispatch(actions.reset())
        },  
        getValueFromService: rxMethod<void>(pipe(
            switchMap(() => counterService.getValueFromService().pipe(tapResponse({
                next: (val) => {
                    ngrxStore.dispatch(actions.set(val));
                },
                error: () => {
                    return EMPTY;
                }
            })))
        ))
    })));

