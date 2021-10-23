import { Props } from '../../lib/base-component';
import ErrorPage from '../error';

class Page500 extends ErrorPage {
  constructor(props: Props) {
    super({
      errorCode: '5xx',
      subtitle: 'Ошибка на сервере! Мы уже разбираемся :(',
      ...props,
    });
  }
}

export default Page500;
