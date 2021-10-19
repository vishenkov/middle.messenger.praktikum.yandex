import authApi from '../api/auth-api';
import userApi from '../api/user-api';
import Router from '../lib/router/router';
import store from '../store';
import actions from '../store/actions';

import { validate, handleError } from './decorators';
import { Login, Registration } from '../api/types';
import { Indexed } from '../lib/types';

class UserController {
  @validate()
  @handleError()
  async login(data: Login) {
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
  async registration(data: Registration) {
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
    (new Router()).go('/');
  }

  @handleError()
  async load() {
    const user = await authApi.getUser();
    store.dispatch({ type: actions.setUser, payload: user });
    store.dispatch({ type: actions.setFormValues, payload: user });
  }

  @validate()
  @handleError()
  async updateProfile(data: Indexed) {
    const { user } = store.getState();
    const updatedUser = await userApi.changeProfile({ ...data, login: user.login });
    store.dispatch({ type: actions.setUser, payload: updatedUser });
  }

  @validate()
  @handleError()
  async updatePassword(data: Indexed) {
    await userApi.changePassword(data);

    const router = new Router();
    router.go('/settings');
  }

  @validate()
  @handleError()
  async updateAvatar(data: Indexed) {
    const updatedUser = await userApi.changeAvatar(data);
    store.dispatch({ type: actions.setUser, payload: updatedUser });

    const router = new Router();
    router.go('/settings');
  }

  @validate()
  @handleError()
  async search(data: Indexed) {
    const results = await userApi.search(data);

    return results;
  }
}

export default new UserController();
