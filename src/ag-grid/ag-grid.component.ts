import { Component, effect, signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'ag-grid',
  standalone: true,
  imports: [AgGridAngular],
  template: `
  <h1>AG Grid with Signals</h1>
  <ag-grid-angular
  class="ag-theme-quartz"
  style="height: 500px;"
   [columnDefs]="colDefs" 
   (gridReady)="onGridReady($event)"
   />
  `,
})
export class AgGridComponent {
  #gridApi!: GridApi<any>;

  // This is our key connection
  gridReady = signal(false);

  constructor() {
    // Use an effect to listen to when grid is ready to do your manipulation before sending data to grid
    // This helps with race conditions where we may be getting data from a source before AG
    // Grid is ready to render
    effect(() => {
      if (this.gridReady()) {
        this.#gridApi.setGridOption('rowData', this.rowData);
        this.#gridApi.sizeColumnsToFit()
      }
    });
  }
  rowData = [
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ];

  colDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
  ];

  onGridReady = (params: GridReadyEvent): void => {
    this.#gridApi = params.api;
    this.gridReady.set(true);
  };
}
