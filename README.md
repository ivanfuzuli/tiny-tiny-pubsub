![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/ivanfuzuli/tiny-tiny-pubsub/Release/main)
![npm bundle size](https://img.shields.io/bundlephobia/min/tiny-tiny-pubsub)
![npm](https://img.shields.io/npm/v/tiny-tiny-pubsub)
![GitHub last commit](https://img.shields.io/github/last-commit/ivanfuzuli/tiny-tiny-pubsub)
![GitHub](https://img.shields.io/github/license/ivanfuzuli/tiny-tiny-pubsub)

## What is the purpose?

It's a very tiny library for **publish/subscribe(pubsub)** operations. There's **no dependency**. It's **only** 933(gziped: 437) byte. Written in **TypeScript**

## Tests Coverage

**100%** coverage.

## Usage

### Install package

```javascript
# NPM
npm install tiny-tiny-pubsub

# Yarn
yarn add tiny-tiny-pubsub
```

### Register a function

```javascript
import pubsub from 'tiny-tiny-pubsub';
pubsub.on('test', (data) => {
  console.log('called with ' + data);
});
```

### Unregister a function

```javascript
import pubsub from 'tiny-tiny-pubsub';
pubsub.off('test', fn);
```

### Trigger

```javascript
import pubsub from 'tiny-tiny-pubsub';
pubsub.trigger('test', 'sample data');
```

### Clear

It clears all event listeners.

```javascript
import pubsub from 'tiny-tiny-pubsub';
pubsub.clear();
```

### Licence

MIT
