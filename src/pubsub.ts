type Fn = () => void;
interface PubSubInterface {
  on(name: string, fn: Fn): void;
  off(name: string, fn: Fn): void;
  trigger(name: string, data: any): void;
  clear(): void;
}

/**
 * Creates a new pubsub instance
 */
class PubSub implements PubSubInterface {
  private listeners: { [key: string]: Fn[] } = {};

  /**
   * it registers a new event with provided values
   *
   * @example
   * pubsub.on('test', 'hello world');
   *
   * @param name {string} - event name
   * @param fn - {function} - callback function
   * @returns {void}
   */
  on(name: string, fn: Fn) {
    this.listeners[name] = this.listeners[name] || [];
    this.listeners[name].push(fn);
  }

  /**
   * it removes an event from event listeners
   *
   * @example
   * pubsub.off('test', predefinedFn);
   *
   * @param name {string} -  event name
   * @param fn  {function} callback function
   */
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

  /**
   * it trigger an event with spesified data
   *
   * @example
   * * // without any data
   * pubsub.trigger("test");
   * // with string type data
   * pubsub.trigger("test", "nothing");
   * // with object type data
   * pubsub.trigger("test", {'hello', 'world'});
   *
   * @param name event name
   * @param data callback data
   * @returns {void}
   */
  trigger(name: string, data?: any) {
    if (this.listeners[name]) {
      this.listeners[name].forEach((fn: (data: any) => void) => {
        fn(data);
      });
    }
  }

  /**
   * clears all listener
   * returns {void}
   */
  clear() {
    this.listeners = {};
  }

  _listeners() {
    return this.listeners;
  }
}

export default new PubSub();
