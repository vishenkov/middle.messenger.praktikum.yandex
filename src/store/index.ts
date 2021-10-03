import Store from '../lib/store/store';

import userReducer from './reducers/userReducer';

const reducers = {
  user: userReducer,
};

const initialState = {
  user: null,
};

export default new Store(reducers, initialState);
