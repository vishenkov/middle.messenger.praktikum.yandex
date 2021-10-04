import BaseComponent from '../../lib/base-component';
import getInputTmpl from './input.tmpl';

import Native from '../native';
import Typography from '../typography';
import isEqual from '../../lib/utils/is-equal';

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

  componentDidUpdate(oldProps: Props, newProps: Props) {
    return !isEqual(oldProps, newProps);
  }

  render() {
    return getInputTmpl(this.props);
  }
}

export default Input;
