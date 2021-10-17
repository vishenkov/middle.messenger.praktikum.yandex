import { Props } from '../../lib/base-component';
import ErrorPage from '../error';

class Page404 extends ErrorPage {
  constructor(props: Props) {
    super({
      errorCode: 404,
      subtitle: 'страница не найдена',
      ...props,
    });
  }
}

export default Page404;
