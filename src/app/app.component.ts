import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { dispatch, globalState, increment, decrement, storeAction, doubleCount } from './store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JsonPipe],
  template: `
    Action <br/>
    {{ action() | json }}<br/>
    Counter {{ state().counter }}<br/>
    Double {{ double() }}<br/>

    <p>
      <button (click)="increment()">Increment</button>

      <button (click)="decrement()">Decrement</button>
    </p>
  `,
})
export class AppComponent {
  action = storeAction;
  state = globalState;
  double = doubleCount;

  increment() {
    dispatch(increment());
  }

  decrement() {
    dispatch(decrement());
  }  
}
