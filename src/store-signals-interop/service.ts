import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

@Injectable()
export class CounterService {
  getValueFromService() {
    return of({}).pipe(map(() => getRandomInt(20)))
  }
}