![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/ivanfuzuli/tiny-tiny-pubsub/Release/main)
![npm bundle size](https://img.shields.io/bundlephobia/min/tiny-tiny-pubsub)

## What is the purpose?

It's a very tiny library for pubsub operations. There's no dependency. It's only 933(gziped: 437) byte.

## Tests Coverage

100% coverage.

## Usage

### Install package

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

### Licence

MIT
