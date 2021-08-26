import './index.css';
import getLoginPage from './pages/login';
import getRegistrationPage from './pages/registration';
import getErrorPage from './pages/error';

function getCurrentPage() {
  const { pathname } = window.location;

  switch (pathname) {
    case '/':
      return getLoginPage();

    case '/registration':
      return getRegistrationPage();

    case '/500':
      return getErrorPage(500);

    default:
      return getErrorPage(404);
  }
}

const root = document.querySelector('body');
const renderedTemplate = getCurrentPage();

root.innerHTML = renderedTemplate;
