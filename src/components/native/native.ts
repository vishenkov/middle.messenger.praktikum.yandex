import BaseComponent from '../../lib/base-component';

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

  render() { return ''; }
}

export default NativeComponent;
