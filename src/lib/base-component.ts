import EventBus from './services/event-bus';
import Templator from './templator';

import isEqual from './utils/is-equal';

import {
  Props, Component, Handler, Block, DomNode,
} from './types';

import isNull from './utils/is-null';

type Meta = {
  props: Props;
  components: Component;
};
abstract class BaseComponent implements Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CWM: 'flow:component-did-mount',
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

  protected _element: DomNode;

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
    this.eventBus.on(BaseComponent.EVENTS.FLOW_CWM, this._componentWillMount.bind(this));
    this.eventBus.on(BaseComponent.EVENTS.FLOW_RENDER, this._render.bind(this));
    this.eventBus.on(BaseComponent.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(BaseComponent.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  protected init() {
    this.registerHandlers();
    this.eventBus.emit(BaseComponent.EVENTS.FLOW_CWM);
  }

  registerHandlers() {}

  protected _componentWillMount() {
    this.componentWillMount();
    this.eventBus.emit(BaseComponent.EVENTS.FLOW_RENDER);
  }

  protected _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(): void {}

  protected _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      if (this._removeEvents) {
        this._removeEvents(oldProps);
      }
      this._render();
    }
  }

  componentWillMount(): void {}

  componentDidUpdate(oldProps: Props, newProps: Props) {
    return !isEqual(oldProps, newProps);
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

  get element(): DomNode {
    return this._element;
  }

  _render() {
    const block = this.render();
    const templator = new Templator(block, this._meta.components);

    const element = templator.compile({ ...this.props, ...this._handlers });

    if (isNull(element)) {
      return;
    }

    if (this._element) {
      this._element.replaceWith(element);
    }

    this._element = element;

    this._addEvents();
  }

  _addEvents(): void {}

  _removeEvents?(oldProps: Props):void;

  render(): string {
    return '';
  }

  getContent(): DomNode {
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

export { Props, Component, Handler };
