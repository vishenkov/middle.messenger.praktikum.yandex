import EventBus from './services/event-bus';
import Templator from './templator';

import {
  Props, Component, Handler, Block,
} from './types';

export { Props, Component, Handler };

type Meta = {
  props: Props,
  components: Component
};
abstract class BaseComponent implements Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  static HANDLERS: Record<string, string> = {
    onClick: 'click',
    onBlur: 'blur',
    onFocus: 'focus',
    onChange: 'change',
    onSubmit: 'submit',
  } as const;

  protected _element: ChildNode;

  protected _meta: Meta;

  props: Props;

  protected _handlers: Handler = {};

  private eventBus: EventBus;

  constructor(props: Props = {}, components: Component = {}) {
    this._meta = {
      props,
      components,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = new EventBus();

    this._registerEvents();
    this.eventBus.emit(BaseComponent.EVENTS.INIT);
  }

  protected _registerEvents() {
    this.eventBus.on(BaseComponent.EVENTS.INIT, this.init.bind(this));
    this.eventBus.on(BaseComponent.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(BaseComponent.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this.eventBus.on(BaseComponent.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected init() {
    this.registerHandlers();
    this.eventBus.emit(BaseComponent.EVENTS.FLOW_CDM);
  }

  registerHandlers() {}

  protected _componentDidMount() {
    this.componentDidMount();
    this.eventBus.emit(BaseComponent.EVENTS.FLOW_RENDER);
  }

  componentDidMount(): void {}

  protected _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this._removeEvents(oldProps);
      this._render();
    }
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return oldProps !== newProps;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }
    const oldProps = { ...this.props };
    Object.assign(this.props, nextProps);
    // batch update
    this.eventBus.emit(BaseComponent.EVENTS.FLOW_CDU, oldProps, nextProps);
  };

  setHandlers = (nextHandlers: Handler) => {
    if (!nextHandlers) {
      return;
    }

    Object.assign(this._handlers, nextHandlers);
  };

  get element(): ChildNode {
    return this._element;
  }

  _render() {
    const block = this.render();
    const templator = new Templator(block, this._meta.components);

    const element = templator.compile(this.props, this._handlers);

    if (this._element) {
      this._element.replaceWith(element as Node);
    }

    this._element = element as ChildNode;

    this._addEvents();
  }

  _addEvents() {
    Object.keys(BaseComponent.HANDLERS).forEach((eventName) => {
      if (this.props[eventName]) {
        this._element!.addEventListener(
          BaseComponent.HANDLERS[eventName],
          this.props[eventName] as EventListener,
        );
      }
    });
  }

  _removeEvents(oldProps: Props) {
    Object.keys(BaseComponent.HANDLERS).forEach((eventName) => {
      if (oldProps[eventName]) {
        this._element!.removeEventListener(
          BaseComponent.HANDLERS[eventName],
          oldProps[eventName] as EventListener,
        );
      }
    });
  }

  abstract render(): string;

  getContent(): ChildNode {
    return this.element;
  }

  private _makePropsProxy(props: Props) {
    const proxyProps = new Proxy(props, {
      get: (target: Props, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: Props, prop: string, value: unknown) => {
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;

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
