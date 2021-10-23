import BaseComponent from '../../lib/base-component';
import getInputTmpl from './input.tmpl';

import Native from '../native';
import Typography from '../typography';
import { InputProps } from './types';

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
    return getInputTmpl(this.props as InputProps);
  }
}

export default Input;
