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

  test('event should be triggered', () => {
    const fn = jest.fn();

    pubSub.on('test', fn);
    pubSub.trigger('test');
    expect(fn).toHaveBeenCalled();
  });

  test('event should be triggered with data', () => {
    const fn = jest.fn();

    pubSub.on('test', fn);
    pubSub.trigger('test', 'data');
    expect(fn).toHaveBeenCalledWith('data');
  });

  test('clear all listeners', () => {
    const fn = jest.fn();
    const fn2 = jest.fn();

    pubSub.on('test', fn);
    pubSub.clear();
    expect(pubSub._listeners()).toEqual({});
  });
});
