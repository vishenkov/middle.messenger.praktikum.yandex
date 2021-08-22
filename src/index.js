import './index.css';
import './fonts.css';
import Templator from './lib/templator';
import Button from './components/button';
import Input from './components/input';

const testTempl = `
  <div>
    {{ field1 }}
    <span>{{field2}}</span>
    <span>{{ field3.info.name }}</span>
    <Input 
      ctx="{{loginInput}}"
    />
  </div>
`;
const components = {
  Input,
  Button,
};
const templator = new Templator(testTempl, components);

const context = {
  field1: 'Text 1',
  field2: 42,
  field3: {
    info: {
      name: 'Simon',
    },
  },
  loginInput: {
    placeholder: 'Login',
    buttonCtxLabel: 'buttonCtx',
    buttonCtx: {
      label: 'Click',
    },
  },
};

const root = document.querySelector('#root');
const renderedTemplate = templator.compile(context);

root.innerHTML = renderedTemplate;
