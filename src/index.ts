import './index.css';

import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import RegistrationPage from './pages/registration';
import ChatsPage from './pages/chats';
import ErrorPage from './pages/error';

import render from './lib/renderDOM';

function getCurrentPage() {
  const { pathname } = window.location;

  switch (pathname) {
    case '/':
      return new LoginPage({});

    case '/registration':
      return new RegistrationPage({});

    case '/profile':
      return new ProfilePage({});

    case '/chats':
      return new ChatsPage({});

    case '/500':
      return new ErrorPage({ errorCode: 500 });

    default:
      return new ErrorPage({ errorCode: 404 });
  }
}

render('#root', getCurrentPage());
