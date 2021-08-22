import './index.css';
import './fonts.css';
import './theme.css';
import getLoginPage from './pages/login';

const root = document.querySelector('#root');
const renderedTemplate = getLoginPage();

root.innerHTML = renderedTemplate;
