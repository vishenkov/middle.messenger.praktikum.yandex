import { Action, State } from '../../lib/store/types';
import actions from '../actions';

export default function formValuesReducer(state: State, action: Action) {
  switch (action.type) {
    case actions.setFormValues:
      return { ...action.payload };

    case actions.clearForm:
      return {};

    default:
      return state;
  }
}
