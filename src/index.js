import './index.css';
import getLoginPage from './pages/login';
import getProfilePage from './pages/profile';
import getRegistrationPage from './pages/registration';
import getChatsPage from './pages/chats';
import getErrorPage from './pages/error';

function getCurrentPage() {
  const { pathname } = window.location;

  switch (pathname) {
    case '/':
      return getLoginPage();

    case '/registration':
      return getRegistrationPage();

    case '/profile':
      return getProfilePage();

    case '/chats':
      return getChatsPage();

    case '/500':
      return getErrorPage(500);

    default:
      return getErrorPage(404);
  }
}

const root = document.querySelector('body');
const renderedTemplate = getCurrentPage();

root.innerHTML = renderedTemplate;
