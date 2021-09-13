import EventBus from './services/event-bus';
import Templator from './templator2.0';

// Нельзя создавать экземпляр данного класса
class BaseComponent {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
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

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(BaseComponent.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(BaseComponent.EVENTS.INIT, this.init.bind(this));
    eventBus.on(BaseComponent.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(BaseComponent.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(BaseComponent.EVENTS.FLOW_RENDER, this._render.bind(this));
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
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this._removeEvents(oldProps);
      this._render();
    }
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

    const element = templator.compile(this.props, this._handlers);

    if (this._element) {
      this._element.replaceWith(element);
    } else {
      this._element = element;
    }

    // this._element = templator.compile(this.props, this._handlers);
    this._addEvents();
  }

  _addEvents() {
    Object.keys(BaseComponent.HANDLERS).forEach((eventName) => {
      if (this.props[eventName]) {
        this._element.addEventListener(BaseComponent.HANDLERS[eventName], this.props[eventName]);
      }
    });
  }

  _removeEvents(oldProps) {
    Object.keys(BaseComponent.HANDLERS).forEach((eventName) => {
      if (oldProps[eventName]) {
        this._element.removeEventListener(BaseComponent.HANDLERS[eventName], oldProps[eventName]);
      }
    });
  }

  // Переопределяется пользователем. Необходимо вернуть разметку
  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    const proxyProps = new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldProps = { ...target };
        target[prop] = value;

        this.eventBus().emit(BaseComponent.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет прав');
      },
    });

    return proxyProps;
  }
}

export default BaseComponent;
