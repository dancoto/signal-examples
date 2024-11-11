import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

@Component({
  selector: 'indirect',
  standalone: true,
  template: `
    <h1>Indirect Signal Usage</h1>
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

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndirectComponent {
  firstCount = signal(0);
  secondCount = signal(0);

  // Computed and effect can reference indirect signals for changes
  // Notice how we are just calling the calculateSum() function without any signals in the
  // computed
  sum = computed(() => this.calculateSum());

  calculateSum = () => this.firstCount() + this.secondCount();

  // We can use `update` to reference a previous value
  addToFirst = () => {
    this.firstCount.update((prev) => prev + 1);
  };

  addToSecond = () => {
    this.secondCount.update((prev) => prev + 1);
  };
}
