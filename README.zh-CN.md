[English](./README.md) | 简体中文

# icestore-next

> 基于 React Hooks 的轻量级状态管理框架。

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

## 简介

`icestore-next` 是基于 React Hooks 实现的轻量级状态管理框架，具有以下特征：

* **最小和熟悉的 API**: 没有额外的学习成本，只需要了解 React Hooks；
* **中心化**: 很方便地进行数据初始化和状态联动；
* **状态只读 API**: 支持只读模型的状态而不订阅状态的更新；
* **良好的兼容性**: Class 组件兼容和良好的 TypeScript 类型检查和推断。

## 快速开始

```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from '@ice/store-next';

const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

// 1️⃣ 通过自定义 Hooks 定义模型
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

// 2️⃣ 创建 Stroe
const store = createStore(models);

// 3️⃣ 消费模型
const { useModel, getModel } = store;
function Button() {
  // 通过 getModel 方法可以获取到模型的最新状态，并且不为组件订阅其更新
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
    <div>
      <button type="button" onClick={handleDecrement}>-</button>
      <button type="button" onClick={handleDecrementAsync}>Async-</button>
    </div>
  );
}
function Count() {
  const { count } = useModel('counter');
  return (<span>{count}</span>);
}

// 4️⃣ 通过 Provider 绑定 Stroe 到视图
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

## 安装

使用 icestore 需要 React 在 16.8.0 版本以上。

```bash
npm install @ice/store-next --save
```

## 浏览器兼容

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![UC](https://raw.github.com/alrra/browser-logos/master/src/uc/uc_48x48.png) |
| :--------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|✔ |✔|✔|9+ ✔|✔|✔|✔|

## 参与贡献

欢迎通过 [issue](https://github.com/alibaba/ice/issues/new) 反馈问题。

如果对 `icestore` 感兴趣，请参考 [CONTRIBUTING.md](https://github.com/alibaba/ice/blob/master/.github/CONTRIBUTING.md) 学习如何贡献代码。

## 社区

| 钉钉群	                             | GitHub issues |  Gitter |
|-------------------------------------|--------------|---------|
| <a href="https://ice.alicdn.com/assets/images/qrcode.png"><img src="https://ice.alicdn.com/assets/images/qrcode.png" width="150" /></a> | [issues]     | [gitter]|

[issues]: https://github.com/alibaba/ice/issues
[gitter]: https://gitter.im/alibaba/ice

## License

[MIT](LICENSE)
