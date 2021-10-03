import BaseComponent from '../lib/base-component';
import { Props } from '../lib/types';
import { State, EVENTS } from '../lib/store/types';
import store from './index';

export default function connect(mapStateToProps: (state: State) => Record<string, unknown>) {
  return function Connected(Component: typeof BaseComponent) {
    return class WithStore extends Component {
      constructor(props: Props) {
        super({ ...props, ...mapStateToProps(store.getState()) });
      }

      componentWillMount() {
        super.componentWillMount();

        store.on(EVENTS.change, () => {
          this.setProps({
            ...this.props,
            ...mapStateToProps(store.getState()),
          });
        });
      }
    };
  };
}
