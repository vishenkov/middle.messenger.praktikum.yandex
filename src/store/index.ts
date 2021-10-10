import Store from '../lib/store/store';

import userReducer from './reducers/userReducer';
import formErrorsReducer from './reducers/formErrorsReducer';
import formValuesReducer from './reducers/formValuesReducer';
import requestErrorReducer from './reducers/requestErrorReducer';
import chatsReducer from './reducers/chatsReducer';

const reducers = {
  user: userReducer,
  formErrors: formErrorsReducer,
  formValues: formValuesReducer,
  requestError: requestErrorReducer,
  chats: chatsReducer,
};

const initialState = {
  user: null,
  formErrors: {},
  formValues: {},
  requestError: null,
  chats: [],
};

export default new Store(reducers, initialState);
