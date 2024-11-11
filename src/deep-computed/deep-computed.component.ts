import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { deepComputed } from '@ngrx/signals';
@Component({
    selector: 'deep-computed',
    standalone: true,
    imports: [],
    template: `
  <h1>Deep Computed</h1>
  <div>
    First: {{firstCount()}}
    <button (click)="addToFirst()">Add to first</button>
  </div>
  <div>
    Second: {{secondCount()}}
    <button (click)="addToSecond()">Add to second</button>
  </div>
  <div></div>
  Sum: {{sum()}}
  <div></div>
  <!-- Notice how we can reference using counters.property() -->
  NestedCounterVals: FIRST:{{counters.first()}} , SECOND:{{counters.second()}}
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeepComputedComponent {
    firstCount = signal(0);
    secondCount = signal(0);

    // We can use `deepComputed` to create a top level object of signals that can each be independently listened on
    counters = deepComputed(() => ({
        first: this.firstCount(),
        second: this.secondCount()
    }));

    sum = computed(() => this.calculateSum());

    calculateSum = () => this.firstCount() + this.secondCount();
  
    addToFirst = () => {
      this.firstCount.update((prev) => prev + 1);
    };
  
    addToSecond = () => {
      this.secondCount.update((prev) => prev + 1);
    };
}
