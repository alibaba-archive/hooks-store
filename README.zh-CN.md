[English](./README.md) | 简体中文

> 注意：icestore-next 依然处于实验阶段，请不要将它应用于生产环境！！！

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
* **良好的兼容性**: 类组件兼容和良好的 TypeScript 类型检查和推断。

## 快速开始

```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from '@ice/store-next';

// 1️⃣ 通过自定义 Hooks 定义模型
function useCounter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  return {
    count,
    increment,
  };
}

const models = {
  counter: useCounter,
};

// 2️⃣ 创建 Stroe
const store = createStore(models);

// 3️⃣ 消费模型
const { useModel } = store;
function Button() {
  const { increment } = useModel('counter');
  return (
    <button type="button" onClick={increment}> + </button>
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

## 进阶用法

### 只读不订阅更新

在某些场景下，您可能只希望调用模型返回的方法更新状态而不订阅模型状态的更新。
例如「快速开始」示例中的 Button 组件，您没有在组件中消费模型的状态，因此可能不期望模型状态的变化触发组件的重新渲染。
这时候您可以使用 `getModel` API，看下面的示例，可以与上面的示例进行比较：

```jsx
const { getModel } = store;
function Button() {
  function handleIncrement() {
    getModel('counter').increment();
  }
  return (
    <button type="button" onClick={handleIncrement}> + </button>
  );
}
```

### 模型联动

在某些场景下，您可能期望 A 模型的某个状态的变更触发 B 模型某个状态的更新。我们把这种行为称为「模型联动」。
例如下面的场景：

- 我们有一个 todos 模型，模型记录了所有的任务列表。
- 我们有一个 user 模型，模型中有一个 todos 字段，记录了当前用户拥有的任务数。
- 每当 todos 模型的任务列表发生了变更，用户持有的任务数就需要保持同步。

#### 方式一：状态订阅

```js
import { useEffect, useState } from 'react';
import produce from 'immer';
import '@/store';

function useUser() {
  const [state, setState] = useState({ todos: 0 });
  const [todos] = store.useModel('todos');

  useEffect(() => {
    setState(produce((draft) => {
      draft.todos = todos.length;
    }));
  }, [ todos ]);

  return [state, setState];
}
```

#### 方式二：方法调用

```js
import { useState } from 'react';
import produce from 'immer';
import '@/store';

function useTodos() {
  const [state, setState] = useState([
    {
      name: 'angular',
    },
  ]);

  function setTodos(todos) {
    setState(todos);

    const [, setUser] = store.getModel('user');
    setUser(produce((draft) => {
      draft.todos = todos.length;
    }));
  }
 
  return [state, { setTodos }];
}
```

### 在类组件中使用

虽然模型是通过自定义 Hooks 定义的，但您仍然可以在类组件中获取和订阅模型：

```tsx
import { Component } from 'react';
import store from '@/store';
import useTodos from '@/models/todos';

const { withModel } = store;

interface MapModelToProp {
  todos: ReturnType<typeof useTodos>; // 这个字段是 withModel 自动添加的
}

interface CustomProp {
  title: string; // 用户自定义的 props
}

type Props = CustomProp & MapModelToProp;

class Todos extends Component<Props> {
  render() {
    const { title, todos } = this.props;
    const [ state, actions ] = todos;
    return (
      <div>
        {
          state.map(({ name }, index) => {
            return (<div key={index}>
              {name}
              <button onClick={() => actions.remove(index)}>
                删除
              </button>
            </div>);
          })
        }
      </div>
    );
  }
}

export default withModel('todos')<MapModelToProp, Props>(Todos);
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
