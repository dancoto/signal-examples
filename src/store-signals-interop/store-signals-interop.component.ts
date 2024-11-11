import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterService } from './service';
import { CounterSignalStore } from './signal-store';
import { selectCounter } from './store';
  
  @Component({
    selector: 'store-signals-interop',
    standalone: true,
    imports: [],
    providers: [CounterService, CounterSignalStore],
    template: `
      <h1>Ngrx Store and Signal Store interop</h1>
      <div>
        <button (click)="increment()">Increment</button>
      </div>
      <div>
        <button (click)="decrement()">Decrement</button>
      </div>
      <div>
        <button (click)="getValueFromService()">Get Value from Service</button>
      </div>
      <div>
        <button (click)="reset()">Reset</button>
      </div> 
      <div></div>
      count: {{count()}}
  
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class StoreSignalsInteropComponent {
    store = inject(Store);
    signalStore = inject(CounterSignalStore);
    count = this.store.selectSignal(selectCounter);

    increment = (): void => {
        this.signalStore.increment();
    }

    decrement = (): void => {
        this.signalStore.decrement();
    }

    reset = (): void => {
        this.signalStore.reset();
    }

    getValueFromService = (): void => {
        this.signalStore.getValueFromService()
    }
  }
  