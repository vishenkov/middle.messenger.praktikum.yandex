import BaseComponent, { Props } from '../../lib/base-component';
import getInputTmpl from './input.tmpl';

import Native from '../native';
import isEqual from '../../lib/utils/is-equal';
import FormValidator from '../../lib/services/form-validator';

const initialState = {
  error: false,
  value: '',
};
class Input extends BaseComponent {
  formValidator: FormValidator;

  constructor(props: Props) {
    super({ ...initialState, ...props }, {
      Native,
    });

    this.formValidator = new FormValidator();
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    return !isEqual(oldProps, newProps);
  }

  handleBlur(e) {
    const { value } = e.currentTarget;
    const isValid = this.props.validate
      ? this.formValidator.prop(this.props.validate).validate(value)
      : true;

    this.setProps({
      error: !isValid,
      value,
    });
  }

  registerHandlers() {
    this.setHandlers({
      handleBlur: this.handleBlur.bind(this),
    });
  }

  render() {
    return getInputTmpl(this.props);
  }
}

export default Input;
