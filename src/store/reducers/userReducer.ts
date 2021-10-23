import { Action, State } from '../../lib/store/types';
import actions from '../actions';

export default function userReducer(state: State, action: Action) {
  switch (action.type) {
    case actions.setUser:
      return { ...action.payload };

    default:
      return state;
  }
}
