# icestore-next

> Lightweight React state management library based on React Hooks.

[![NPM version](https://img.shields.io/npm/v/@ice/store-next.svg?style=flat)](https://npmjs.org/package/@ice/store-next)
[![Package Quality](https://npm.packagequality.com/shield/@ice%2Fstore.svg)](https://packagequality.com/#?package=@ice/store-next)
[![build status](https://img.shields.io/travis/ice-lab/icestore-next.svg?style=flat-square)](https://travis-ci.org/ice-lab/icestore-next)
[![NPM downloads](http://img.shields.io/npm/dm/@ice/store-next.svg?style=flat)](https://npmjs.org/package/@ice/store-next)
[![Known Vulnerabilities](https://snyk.io/test/npm/@ice/store-next/badge.svg)](https://snyk.io/test/npm/@ice/store-next)
[![David deps](https://img.shields.io/david/ice-lab/icestore-next.svg?style=flat-square)](https://david-dm.org/ice-lab/icestore-next)

<table>
  <thead>
    <tr>
      <th colspan="5"><center>🕹 CodeSandbox demos 🕹</center></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://codesandbox.io/s/github/ice-lab/icestore-next/tree/master/examples/counter?module=/src/index.tsx">Counter</a></td>
      <td><a href="https://codesandbox.io/s/github/ice-lab/icestore-next/tree/master/examples/todos?module=/src/index.tsx">Todos</a></td>
    </tr>
  </tbody>
</table>

## Introduction

`icestore-next` is a lightweight React state management library based on hooks. It has the following core features:

* **Minimal & Familiar API**: No additional learning costs, easy to get started with the knowledge of React Hooks.
* **Class Component Support**: Make old projects enjoying the fun of lightweight state management with friendly compatibility strategy.
* **TypeScript Support**: Provide complete type definitions to support intelliSense in VS Code.

## Basic example

```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from '@ice/store-next';

const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

// 1️⃣ Use a model to define your store
function useCounter() {
  const [count, setCount] = useState(0);
  const decrement = () => setCount(count - 1);
  const decrementAsync = async () => {
    await delay(1000);
    decrement();
  };

  return {
    count,
    decrement,
    decrementAsync,
  };
}

const models = {
  counter: useCounter,
};

// 2️⃣ Create the store
const store = createStore(models);

// 3️⃣ Consume model
const { useModel, getModel } = store;
function Button() {
  function getCounter() {
    return getModel('counter');
  }
  function handleDecrementAsync() {
    getCounter().decrementAsync();
  }
  function handleDecrement() {
    getCounter().decrement();
  }
  return (
    <>
      <button type="button" onClick={handleDecrement}>-</button>
      <button type="button" onClick={handleDecrementAsync}>Async-</button>
    </>
  );
}
function Count() {
  const { count } = useModel('counter');
  return (<span>{count}</span>);
}

// 4️⃣ Wrap your components with Provider
const { Provider } = store;
function App() {
  return (
    <Provider>
      <Count />
      <Button />
    </Provider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

```

## Installation

icestore requires React 16.8.0 or later.

```bash
npm install @ice/store-next --save
```

## Browser Compatibility

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![UC](https://raw.github.com/alrra/browser-logos/master/src/uc/uc_48x48.png) |
| :--------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|✔ |✔|✔|9+ ✔|✔|✔|✔|

## Contributors

Feel free to report any questions as an [issue](https://github.com/alibaba/ice/issues/new), we'd love to have your helping hand on icestore.

If you're interested in icestore, see [CONTRIBUTING.md](https://github.com/alibaba/ice/blob/master/.github/CONTRIBUTING.md) for more information to learn how to get started.

## Community

| DingTalk community                               | GitHub issues |  Gitter |
|-------------------------------------|--------------|---------|
| <a href="https://ice.alicdn.com/assets/images/qrcode.png"><img src="https://ice.alicdn.com/assets/images/qrcode.png" width="150" /></a> | [issues]     | [gitter]|

[issues]: https://github.com/alibaba/ice/issues
[gitter]: https://gitter.im/alibaba/ice

## License

[MIT](LICENSE)
