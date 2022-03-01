import pubSub from '../src/pubsub';

describe('pubSub', () => {
  afterEach(() => {
    pubSub.clear();
  });
  test('event registration successful', () => {
    const fn = jest.fn();

    pubSub.on('test', fn);
    expect(pubSub._listeners()).toEqual({
      test: [fn],
    });
  });

  test('event remove successful', () => {
    const fn = jest.fn();

    pubSub.on('test', fn);
    pubSub.off('test', fn);
    expect(pubSub._listeners()).toEqual({ test: [] });
  });

  test('event remove successfully with wildcard', () => {
    const fn = jest.fn();

    pubSub.on('test', fn);
    pubSub.on('test.driven', fn);
    pubSub.on('test.driven.development', fn);

    pubSub.off('test.*');
    expect(pubSub._listeners()).toEqual({ test: [fn] });
  });

  test('event should be triggered', () => {
    const fn = jest.fn();

    pubSub.on('test', fn);
    pubSub.trigger('test');
    expect(fn).toHaveBeenCalled();
  });

  test('event should be triggered with wildcard', () => {
    const fn = jest.fn();
    const fn2 = jest.fn();
    const fn3 = jest.fn();

    pubSub.on('test', fn);
    pubSub.on('test.driven', fn2);
    pubSub.on('test.driven.development', fn3);

    pubSub.trigger('test*');
    expect(fn).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
    expect(fn3).toHaveBeenCalled();
  });

  test('event should be triggered with data', () => {
    const fn = jest.fn();

    pubSub.on('test', fn);
    pubSub.trigger('test', 'data');
    expect(fn).toHaveBeenCalledWith('data');
  });

  test('clear all listeners', () => {
    const fn = jest.fn();

    pubSub.on('test', fn);
    pubSub.clear();
    expect(pubSub._listeners()).toEqual({});
  });
});
