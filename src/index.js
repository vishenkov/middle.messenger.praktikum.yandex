import './index.css';
import getLoginPage from './pages/login';

const root = document.querySelector('body');
const renderedTemplate = getLoginPage();

root.innerHTML = renderedTemplate;
