import './index.css';

import Router from './lib/router';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import RegistrationPage from './pages/registration';
import ChatsPage from './pages/chats';
// import ErrorPage from './pages/error';

const router = new Router('#root');

router
  .use('/', LoginPage)
  .use('/registration', RegistrationPage)
  .use('/profile', ProfilePage)
  .use('/chats', ChatsPage)
  .start();
