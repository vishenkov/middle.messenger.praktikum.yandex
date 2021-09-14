export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export interface Block {
  render(p?: Props): string
  getContent(): ChildNode
}

export type Props = Record<string, unknown>;
export type Component = Record<string, Type<Block>>;
export type Handler = Record<string, Function>;
