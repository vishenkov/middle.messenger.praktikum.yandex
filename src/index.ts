import './index.css';

import Router from './lib/router';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import RegistrationPage from './pages/registration';
import PasswordPage from './pages/password';
import AvatarPage from './pages/avatar';
import ChatsPage from './pages/chats';
import NewChatPage from './pages/new-chat';
import UsersPage from './pages/users';
import ChatPage from './pages/chat';
import Page404 from './pages/404';
import Page500 from './pages/500';

const router = new Router('#root');

router
  .use('/', ChatsPage)
  .use('/login', LoginPage)
  .use('/sign-up', RegistrationPage)
  .use('/settings', ProfilePage)
  .use('/settings/password', PasswordPage)
  .use('/settings/avatar', AvatarPage)
  .use('/messenger', ChatsPage)
  .use('/messenger/new', NewChatPage)
  .use('/messenger/:id', ChatPage)
  .use('/messenger/:id/users', UsersPage)
  .use('/404', Page404)
  .use('/500', Page500)
  .default('/404')
  .start();
