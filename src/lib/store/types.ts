export interface Action {
  type: string;
  payload?: any;
}

export type Reducer<S = any> = (state: S, action: Action) => S;

export type State = Record<string, unknown>;
export type Reducers = Record<string, Reducer>;

export enum TYPES {
  init = '@@INIT',
}

export enum EVENTS {
  change = 'store:change',
}
