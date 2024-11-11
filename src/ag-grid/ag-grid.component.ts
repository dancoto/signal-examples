import { Component, effect, signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community'; // Column Definition Type Interface

@Component({
  selector: 'ag-grid',
  standalone: true,
  imports: [AgGridAngular], // Add Angular Data Grid Component
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

  gridReady = signal(false);

  constructor() {
    // Use an effect to listen to when grid is ready to do your manipulation before sending data to grid
    effect(() => {
      if (this.gridReady()) {
        this.#gridApi.setGridOption('rowData', this.rowData);
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
