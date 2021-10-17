import authApi from '../api/auth-api';
import userApi from '../api/user-api';
import avatarApi from '../api/avatar-api';
import Router from '../lib/router/router';
import store from '../store';
import actions from '../store/actions';

import validate from './validate';
import handleError from './handleError';

class UserController {
  @validate()
  @handleError()
  async login(data) {
    await authApi.login(data);
    (new Router()).go('/');
  }

  @handleError()
  async logout() {
    authApi.logout();
    (new Router()).go('/login');
  }

  @validate()
  @handleError()
  async registration(data) {
    if (data.password !== data.repeat_password) {
      store.dispatch({
        type: actions.setFormErrors,
        payload: {
          password: '',
          repeat_password: 'Пароль не совпадает',
        },
      });
      return;
    }

    await authApi.registration({ data });
  }

  @handleError()
  async load() {
    const user = await authApi.getUser();
    store.dispatch({ type: actions.setUser, payload: user });
    store.dispatch({ type: actions.setFormValues, payload: user });
  }

  @validate()
  @handleError()
  async updateProfile(data) {
    const { user } = store.getState();
    const updatedUser = await userApi.changeProfile({ ...data, login: user.login });
    store.dispatch({ type: actions.setUser, payload: updatedUser });
  }

  @validate()
  @handleError()
  async updatePassword(data) {
    await userApi.changePassword(data);
  }

  @validate()
  @handleError()
  async updateAvatar(data) {
    await avatarApi.put(data);
  }

  @validate()
  @handleError()
  async search(data) {
    const results = await userApi.search(data);

    return results;
  }
}

export default new UserController();
