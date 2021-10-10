import './index.css';

import Router from './lib/router';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import RegistrationPage from './pages/registration';
import PasswordPage from './pages/password';
import AvatarPage from './pages/avatar';
import ChatsPage from './pages/chats';
import NewChatPage from './pages/new-chat';
// import ErrorPage from './pages/error';

const router = new Router('#root');

router
  .use('/', LoginPage)
  .use('/login', LoginPage)
  .use('/registration', RegistrationPage)
  .use('/settings', ProfilePage)
  .use('/settings/password', PasswordPage)
  .use('/settings/avatar', AvatarPage)
  .use('/messenger', ChatsPage)
  .use('/messenger/new', NewChatPage)
  .start();
