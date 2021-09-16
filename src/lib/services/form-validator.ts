enum Props {
  login = 'login',
  password = 'password',
  phone = 'phone',
  message = 'message',
  email = 'email',
  first_name = 'first_name',
  second_name = 'second_name',
}

function getValidator(prop: string) {
  switch (prop) {
    case Props.login: {
      return (value: string) => (/^(?=.{3,20}$)\d*[a-zA-Z\-_]+\w*$/g).test(value);
    }

    case Props.password: {
      return (value: string) => (/^(?=.{8,40}$)(?=.*\d+)(?=.*[A-Z]+)\w*$/g).test(value);
    }

    case Props.phone: {
      return (value: string) => (/^(?=.{10,15}$)\+{0,1}\d+$/g).test(value);
    }

    case Props.message: {
      return (value: string) => value.length > 0;
    }

    case Props.email:
      return (value: string) => (/^[\w-]+@[\w-]+\.[\w-]+$/g).test(value);

    case Props.first_name:
    case Props.second_name:
      return (value: string) => (/^[A-ZА-Я]+[a-zA-Zа-яА-Я-]+$/g).test(value);

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
