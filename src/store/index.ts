import Store from '../lib/store/store';

import userReducer from './reducers/userReducer';
import formErrorsReducer from './reducers/formErrorsReducer';
import formValuesReducer from './reducers/formValuesReducer';
import requestErrorReducer from './reducers/requestErrorReducer';
import chatsReducer from './reducers/chatsReducer';
import chatUsersReducer from './reducers/chatUsersReducer';
import tokenReducer from './reducers/tokenReducer';
import messagesReducer from './reducers/messagesReducer';

const reducers = {
  user: userReducer,
  formErrors: formErrorsReducer,
  formValues: formValuesReducer,
  requestError: requestErrorReducer,
  chats: chatsReducer,
  chatUsers: chatUsersReducer,
  tokens: tokenReducer,
  messages: messagesReducer,
};

const initialState = {
  user: null,
  formErrors: {},
  formValues: {},
  requestError: null,
  chatUsers: {},
  chats: [],
  tokens: {},
  messages: [],
};

export default new Store(reducers, initialState);
