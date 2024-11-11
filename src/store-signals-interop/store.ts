import { createActionGroup, createFeature, createReducer, emptyProps, on } from '@ngrx/store';

export const initialState = {
    counter: 0
};

export const actions = createActionGroup({
    source: 'Store Component',
    events: {
        'Increment': emptyProps(),
        'Decrement': emptyProps(),
        'Set': (val: number) => ({ val }),
        'Reset': emptyProps()
    },
});

export const counterFeature = createFeature({
    name: 'counter',
    reducer: createReducer(
        initialState,
        on(actions.increment, (state) => ({
            ...state, counter: state.counter + 1
        })),
        on(actions.decrement, (state) => ({
            ...state, counter: state.counter - 1
        })),
        on(actions.reset, (state) => ({
            ...state, counter: 0
        })),
        on(actions.set, (state, {val}) => ({
            ...state, counter: val
        })),
    ),
});

export const {
    name, // feature name
    reducer, // feature reducer
    selectCounterState, // feature selector
    selectCounter, // selector for `books` property
  } = counterFeature;