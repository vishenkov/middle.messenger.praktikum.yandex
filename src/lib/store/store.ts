import EventBus from '../services/event-bus';
import {
  Action, State, Reducer, Reducers,
  TYPES, EVENTS,
} from './types';

class Store extends EventBus {
  private state: State = {};

  private reducer: Reducer;

  constructor(reducers: Reducers, initialState?: State) {
    super();

    this.reducer = this.combineReducers(reducers);

    if (initialState) {
      this.state = initialState;
    }

    this.dispatch({ type: TYPES.init });
  }

  public dispatch(action: Action) {
    this.state = this.reducer(this.state, action);

    this.emit(EVENTS.change);
  }

  public getState() {
    return this.state;
  }

  private combineReducers(reducers: Reducers): Reducer {
    return (state, action: Action): State => {
      const newState: State = {};

      Object.entries(reducers).forEach(([key, reducer]) => {
        newState[key] = reducer(state[key], action);
      });

      return newState;
    };
  }
}

export default Store;
