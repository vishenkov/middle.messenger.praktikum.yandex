type VoidFunction = (...args: unknown[]) => void;

export interface IEventBus {
  on(event: string, cb: VoidFunction): void,
  emit(event: string, ...args: unknown[]): void,
  off(event: string, callback: VoidFunction): void,
}
class EventBus implements IEventBus {
  private listeners: Record<string, (VoidFunction)[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: VoidFunction) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event: string, ...args: unknown[]) {
    this.listeners[event].forEach((listener: VoidFunction) => {
      listener(...args);
    });
  }

  off(event: string, callback: VoidFunction) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].filter((listener: VoidFunction) => listener === callback);
  }
}

export default EventBus;
