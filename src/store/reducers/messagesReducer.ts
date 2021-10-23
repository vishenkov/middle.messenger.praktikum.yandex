import { Action } from '../../lib/store/types';
import actions from '../actions';

export default function messagesReducer(state: [], action: Action) {
  switch (action.type) {
    case actions.setMessage:
      return [
        ...state,
        { ...action.payload },
      ].sort((a, b) => (new Date(a.time)).valueOf() - (new Date(b.time)).valueOf());

    default:
      return state;
  }
}
