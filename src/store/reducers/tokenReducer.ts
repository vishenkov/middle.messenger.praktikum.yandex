import { Action, State } from '../../lib/store/types';
import actions from '../actions';

export default function tokenReducer(state: State, action: Action) {
  switch (action.type) {
    case actions.setToken:
      return {
        ...state,
        [action.payload.id]: action.payload.token,
      };

    default:
      return state;
  }
}
