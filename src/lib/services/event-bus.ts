type VoidFunction = (...args: unknown[]) => void;
class EventBus {
  private listeners: Record<string, VoidFunction[]>;

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
    if (!this.listeners[event]) {
      throw new Error(`Event ${event} is not defined!`);
    }

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
