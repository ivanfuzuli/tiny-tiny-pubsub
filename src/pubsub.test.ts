import pubSub from './pubsub';

describe('pubSub', () => {
  test('event registration successful', () => {
    const fn = jest.fn();

    pubSub.on('test', fn);
    expect(pubSub._listeners()).toEqual({
      test: [fn],
    });
  });
});
