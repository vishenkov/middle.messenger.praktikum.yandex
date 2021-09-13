import BaseComponent from '../../lib/base-component';

/*
  Создаем нативные html-элементы
*/

class NativeComponent extends BaseComponent {
  _render() {
    const { __tag } = this.props;
    const element = document.createElement(__tag);

    Object.keys(this.props).forEach((prop) => {
      if (prop === '__tag') {
        return;
      }

      if (BaseComponent.HANDLERS[prop]) {
        return;
      }

      element.setAttribute(prop, this.props[prop]);
    });

    this._element = element;
    this._addEvents();
  }
}

export default NativeComponent;
