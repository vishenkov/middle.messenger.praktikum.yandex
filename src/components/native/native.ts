import BaseComponent from '../../lib/base-component';
import {
  Props,
} from '../../lib/types';

/*
  Создаем нативные html-элементы
*/

class NativeComponent extends BaseComponent {
  _render() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { __tag } = this.props;
    const element = document.createElement(__tag as string);

    Object.keys(this.props).forEach((prop) => {
      if (prop === '__tag') {
        return;
      }

      if (BaseComponent.HANDLERS[prop]) {
        return;
      }

      element.setAttribute(prop, String(this.props[prop]));
    });

    this._element = element;
    this._addEvents();
  }

  _addEvents() {
    Object.keys(BaseComponent.HANDLERS).forEach((eventName) => {
      if (this.props[eventName]) {
        this._element?.addEventListener(
          BaseComponent.HANDLERS[eventName],
          this.props[eventName] as EventListener,
        );
      }
    });
  }

  _removeEvents(oldProps: Props) {
    Object.keys(BaseComponent.HANDLERS).forEach((eventName) => {
      if (oldProps[eventName]) {
        this._element?.removeEventListener(
          BaseComponent.HANDLERS[eventName],
          oldProps[eventName] as EventListener,
        );
      }
    });
  }

  render() { return ''; }
}

export default NativeComponent;
