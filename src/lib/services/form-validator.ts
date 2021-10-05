enum Props {
  login = 'login',
  password = 'password',
  phone = 'phone',
  message = 'message',
  email = 'email',
  first_name = 'first_name',
  second_name = 'second_name',
}

const loginRegExp = /^(?=.{3,20}$)\d*[a-zA-Z\-_]+\w*$/g;
const phoneRegExp = /^(?=.{10,15}$)\+{0,1}\d+$/g;
const passwordRegExp = /^(?=.{8,40}$)(?=.*\d+)(?=.*[A-Z]+)\w*$/g;
const emailRegExp = /^[\w-]+@[\w-]+\.[\w-]+$/g;
const nameRegExp = /^[A-ZА-Я]+[a-zA-Zа-яА-Я-]+$/g;

function getValidator(prop: string) {
  switch (prop) {
    case Props.login: {
      return (value: string) => value.match(loginRegExp);
    }

    case Props.password:
      return (value: string) => value.match(passwordRegExp);

    case Props.phone:
      return (value: string) => Boolean(value.match(phoneRegExp));

    case Props.message: {
      return (value: string) => value.length > 0;
    }

    case Props.email:
      return (value: string) => value.match(emailRegExp);

    case Props.first_name:
    case Props.second_name:
      return (value: string) => Boolean(value.match(nameRegExp));

    default:
      throw new Error(`Unknown ${prop} for validation!`);
  }
}

class FormValidator {
  private _prop: string;

  constructor(prop?: string) {
    if (prop) {
      this._prop = prop;
    }
  }

  prop(prop: string) {
    this._prop = prop;
    return this;
  }

  validate(value: string): boolean {
    const validator = getValidator(this._prop);

    return validator(value);
  }

  supports(prop: string) {
    if (prop in Props) {
      return true;
    }

    return false;
  }
}

export default FormValidator;
