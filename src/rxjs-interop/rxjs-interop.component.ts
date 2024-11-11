import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, combineLatest, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'rxjs-interop',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h1>Combining Rxjs and Signals</h1>
    <div [formGroup]="profileForm">
    <input type="text" formControlName="firstName"/>
    <input type="text" formControlName="lastName"/>
    </div>
    <div>
    Full Name: {{fullName()}}
    </div>
    <div>
    Full Name Reversed: {{fullNameReversed()}}
    </div>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxjsInteropComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  // We can listen to valueChanges individually and process as needed
  #firstName$ = this.profileForm.controls.firstName.valueChanges.pipe(
    startWith(this.profileForm.controls.firstName.value),
    debounceTime(300)
  );
  #lastName$ = this.profileForm.controls.lastName.valueChanges.pipe(
    startWith(this.profileForm.controls.lastName.value),
    debounceTime(300)
  );

  // Then do what we need to and use toSignal to easily reference it as a signal
  fullName = toSignal(
    combineLatest([this.#firstName$, this.#lastName$]).pipe(
      map(([firstName, lastName]) => firstName + ' ' + lastName)
    )
  );

  fullNameReversed = computed(() =>
    this.fullName()?.split('').reverse().join('')
  );
}
