import './index.css';
import Login from './pages/login';

const loginPage = new Login({});

document.body.appendChild(loginPage.getContent());
