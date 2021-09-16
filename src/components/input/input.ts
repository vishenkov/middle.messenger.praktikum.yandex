import BaseComponent from '../../lib/base-component';
import getInputTmpl from './input.tmpl';

import Native from '../native';
import isEqual from '../../lib/utils/is-equal';
import FormValidator from '../../lib/services/form-validator';

import { Event, Props } from '../../lib/types';

type InputProps = Props & {
  validate?:string
};

const initialState = {
  error: false,
  value: '',
};
class Input extends BaseComponent {
  formValidator: FormValidator;

  constructor(props: InputProps) {
    super({ ...initialState, ...props }, {
      Native,
    });

    this.formValidator = new FormValidator();
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    return !isEqual(oldProps, newProps);
  }

  validate(value: string) {
    if (this.props.validate) {
      return this.formValidator.prop(this.props.validate as string).validate(value);
    }

    return true;
  }

  handleBlur(e: Event) {
    const { value } = e.currentTarget;
    const isValid = this.validate(value);

    this.setProps({
      error: !isValid,
      value,
    });
  }

  handleFocus(e: Event) {
    const { value } = e.currentTarget;
    const isValid = this.validate(value);

    console.warn('is valid', this.props.name, isValid);
  }

  registerHandlers() {
    this.setHandlers({
      handleBlur: this.handleBlur.bind(this),
      handleFocus: this.handleFocus.bind(this),
    });
  }

  render() {
    return getInputTmpl(this.props);
  }
}

export default Input;
