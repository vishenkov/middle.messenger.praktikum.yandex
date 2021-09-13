import EventBus from './services/event-bus';
import Templator from './templator2.0';

// Нельзя создавать экземпляр данного класса
class BaseComponent {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
  };

  static HANDLERS = {
    onClick: 'click',
    onBlur: 'blur',
    onFocus: 'focus',
    onChange: 'change',
  };

  _element = null;

  _meta = null;

  props = null;

  _handlers = {};

  constructor(props = {}, components = {}) {
    const eventBus = new EventBus();

    this._meta = {
      props,
      components,
    };

    console.log('constructor::props', props);

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(BaseComponent.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(BaseComponent.EVENTS.INIT, this.init.bind(this));
    eventBus.on(BaseComponent.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(BaseComponent.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    // const { tagName } = this._meta;
    // this._element = this._createDocumentElement(tagName);
  }

  init() {
    this.registerHandlers();
    this.eventBus().emit(BaseComponent.EVENTS.FLOW_CDM);
  }

  registerHandlers() {}

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(BaseComponent.EVENTS.FLOW_RENDER);
  }

  componentDidMount(oldProps) {}

  _componentDidUpdate(oldProps, newProps) {
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  setHandlers = (nextHandlers) => {
    if (!nextHandlers) {
      return;
    }

    Object.assign(this._handlers, nextHandlers);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    const templator = new Templator(block, this._meta.components);

    this._element = templator.compile(this.props, this._handlers);
    this._addEvents();
  }

  _addEvents() {
    Object.keys(BaseComponent.HANDLERS).forEach((eventName) => {
      if (this.props[eventName]) {
        this._element.addEventListener(BaseComponent.HANDLERS[eventName], this.props[eventName]);
      }
    });
  }

  // Переопределяется пользователем. Необходимо вернуть разметку
  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    // Еще один способ передачи this, но он больше не применяется с приходом ES6+
    const self = this;

    // Здесь вам предстоит реализовать метод
    return props;
  }
}

export default BaseComponent;
