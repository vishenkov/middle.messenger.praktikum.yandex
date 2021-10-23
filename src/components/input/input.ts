import BaseComponent from '../../lib/base-component';
import getInputTmpl from './input.tmpl';

import Native from '../native';
import Typography from '../typography';

import { Props } from '../../lib/types';

type InputProps = Props & {
  validate?: string;
};

const initialState = {
  error: false,
  value: '',
};
class Input extends BaseComponent {
  props: InputProps;

  constructor(props: InputProps) {
    super({ ...initialState, ...props }, {
      Native,
      Typography,
    });
  }

  render() {
    return getInputTmpl(this.props);
  }
}

export default Input;
