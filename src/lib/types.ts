export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export interface Block {
  render(p?: Props): string;
  getContent(): ChildNode;
}

export type Props = Record<string, unknown>;
export type Component = Record<string, Type<Block>>;
export type Handler = Record<string, Function>;

export type EventTarget = {
  value: string;
};

export type Event = {
  currentTarget: EventTarget;
  preventDefault(): void;
  stopPropagation(): void;
};

export interface DomNode extends ChildNode {
  replaceWith(...nodes: (DomNode | Node | string)[]): void;
}

export type Indexed = Record<string, unknown>;
