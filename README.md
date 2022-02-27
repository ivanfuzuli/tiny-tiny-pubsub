## What is the purpose?

It's a very tiny library for pubsub operations.

## Usage

```
# NPM
npm install tiny-tiny-pubsub

# Yarn
yarn add tiny-tiny-pubsub
```

### Register a function

```
  import pubsub from 'tiny-tiny-pubsub';
  pubsub.on("test", (data) => {
    console.log('called with ' + data)
  })
```

### Unregister a function

```
  import pubsub from 'tiny-tiny-pubsub';
  pubsub.off("test", fn);
```

### Trigger

```
  import pubsub from 'tiny-tiny-pubsub';
  pubsub.trigger("test", "sample data");
```
