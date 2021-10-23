import { Action, State } from '../../lib/store/types';
import actions from '../actions';

export default function messagesReducer(state: State, action: Action) {
  switch (action.type) {
    case actions.setMessage:
      return [
        ...state,
        { ...action.payload },
      ].sort((a, b) => new Date(a.time) - new Date(b.time));

    default:
      return state;
  }
}
