class EventBus {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event, ...args) {
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }

  // Можно называть detach, как больше нравится
  off(event, callback) {
  }
}

export default EventBus;
