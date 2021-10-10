import { Action, State } from '../../lib/store/types';
import actions from '../actions';

export default function chatsReducer(state: State, action: Action) {
  switch (action.type) {
    case actions.setChats:
      return { ...action.payload };

    default:
      return state;
  }
}
