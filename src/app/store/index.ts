import { computed, effect, signal } from "@angular/core";
import { Action, createAction,  createReducer,  INIT, on, combineReducers,createFeatureSelector } from "@ngrx/store";

export const increment = createAction('increment');
export const decrement = createAction('decrement');

const initialState = { counter: 0, doubleCounter: 0 };
export const globalState = signal(initialState);

const counterState = 0;
const counterReducer = createReducer(
  counterState,
  on(increment, (state, action) => state + 1),
  on(decrement, (state, action) => state - 1)
);

const doubleCounterReducer = createReducer(
  counterState,
  on(increment, (state, action) => state * 2),
);

const rootReducer = combineReducers({
  counter: counterReducer,
  doubleCounter: doubleCounterReducer
});

const storeReducer = signal(rootReducer);
export const storeAction = signal<Action>({ type: INIT });

export const dispatch = (action: any) => {
  storeAction.set(action);
};

export const doubleCount = computed(() => globalState().counter * 2);
export const doubleCounter = computed(() => globalState().doubleCounter * 2);

effect(() => {
  const reducer = storeReducer();
  const action = storeAction();

  globalState.update(state => {
    const newState = reducer(state, action);
    console.log('state', newState);
    return newState;
   });
});

effect(() => {
  const action = storeAction();
  console.log(action);
});