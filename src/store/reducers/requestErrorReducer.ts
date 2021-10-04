import { Action, State } from '../../lib/store/types';
import actions from '../actions';

export default function requestErrorReducer(state: State, action: Action) {
  switch (action.type) {
    case actions.setRequestError:
      return action.payload;

    case actions.clearRequestError:
      return null;

    default:
      return state;
  }
}
