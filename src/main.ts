import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { IndirectComponent } from './indirect/indirect.component';
import { RxjsInteropComponent } from './rxjs-interop/rxjs-interop.component';
import { AgGridComponent } from './ag-grid/ag-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IndirectComponent, RxjsInteropComponent, AgGridComponent],
  template: `
      <indirect></indirect>
      <rxjs-interop></rxjs-interop>
      <ag-grid></ag-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}

bootstrapApplication(App);
