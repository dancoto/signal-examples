import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { AgGridComponent } from './ag-grid/ag-grid.component';
import { IndirectComponent } from './indirect/indirect.component';
import { RxjsInteropComponent } from './rxjs-interop/rxjs-interop.component';
import { counterFeature } from './store-signals-interop/store';
import { StoreSignalsInteropComponent } from './store-signals-interop/store-signals-interop.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IndirectComponent, RxjsInteropComponent, AgGridComponent, StoreSignalsInteropComponent],
  template: `
      <indirect></indirect>
      <rxjs-interop></rxjs-interop>
      <store-signals-interop></store-signals-interop>
      <ag-grid></ag-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App { }

bootstrapApplication(App, {
  providers: [provideStore(),
  provideState(counterFeature)]
});
