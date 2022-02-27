type Fn = () => void;
interface PubSubInterface {
  on(name: string, fn: Fn): void;
  off(name: string, fn: Fn): void;
  trigger(name: string, data: any): void;
  clean(): void;
}

class PubSub implements PubSubInterface {
  private listeners: { [key: string]: Fn[] } = {};

  on(name: string, fn: Fn) {
    this.listeners[name] = this.listeners[name] || [];
    this.listeners[name].push(fn);
  }

  off(name: string, fn: Fn) {
    if (this.listeners[name]) {
      for (let i = 0; i < this.listeners[name].length; i++) {
        if (this.listeners[name][i] === fn) {
          this.listeners[name].splice(i, 1);
          break;
        }
      }
    }
  }

  trigger(name: string, data?: any) {
    if (this.listeners[name]) {
      this.listeners[name].forEach((fn: (data: any) => void) => {
        fn(data);
      });
    }
  }

  clean() {
    this.listeners = {};
  }

  _listeners() {
    return this.listeners;
  }
}

export default new PubSub();
