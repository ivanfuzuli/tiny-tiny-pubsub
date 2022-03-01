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
   *
   * @param name - event name
   * @param callback - callback will fired if its matches
   * @returns {boolean}
   */
  private hasWildcard(name: string, callback: (key: string) => void): boolean {
    const index = name.indexOf('*');

    if (index > -1) {
      const nameWithoutAsterix = name.slice(0, index);
      const keys = Object.keys(this.listeners);

      for (const key of keys) {
        if (key.startsWith(nameWithoutAsterix)) {
          callback(key);
        }
      }

      return true;
    }

    return false;
  }

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
   * @example
   * // with wildcard
   * pubsub.off('test.*');
   *
   * @param name {string} -  event name
   * @param fn  {function} callback function
   * @returns {void}
   */
  off(name: string, fn?: Fn) {
    const completed = this.hasWildcard(name, (key) => delete this.listeners[key]);

    if (completed) {
      return true;
    }

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
   * @example
   * // with string type data
   * pubsub.trigger("test", "nothing");
   * @example
   * // with object type data
   * pubsub.trigger("test", {'hello', 'world'});
   *
   * @example
   * // with wildcard
   * pubsub.trigger("test.*", "data");
   *
   * @param name event name
   * @param data callback data
   * @returns {void}
   */
  trigger(name: string, data?: any) {
    const triggerAll = (key: string) => {
      this.listeners[key].forEach((fn: (data: any) => void) => {
        fn(data);
      });
    };
    const completed = this.hasWildcard(name, (key) => {
      triggerAll(key);
    });

    if (completed) {
      return true;
    }

    if (this.listeners[name]) {
      triggerAll(name);
    }
  }

  /**
   * clears all listener
   * @returns {void}
   */
  clear() {
    this.listeners = {};
  }

  _listeners() {
    return this.listeners;
  }
}

export default new PubSub();
