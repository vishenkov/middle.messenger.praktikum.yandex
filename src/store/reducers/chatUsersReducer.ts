import { Action, State } from '../../lib/store/types';
import { User } from '../../api/types';
import actions from '../actions';

export default function userReducer(state: State, action: Action) {
  switch (action.type) {
    case actions.setChatUsers:
      return action.payload.reduce((acc: State, user: User) => {
        acc[user.id] = user;
        return acc;
      }, {});

    default:
      return state;
  }
}
