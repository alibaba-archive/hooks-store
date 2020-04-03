English | [简体中文](./README.zh-CN.md)

> Notice: icestore-next is still in the experimental stage, please do not use it in the production environment!!!

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
* **Centralization**: Easy to initialize data and support model interaction.
* **Readonly API**: Supports read-only state without subscribing to updates.
* **Great Compatibility**: Class Component Support && Perfect TypeScript Support.

## Basic example

```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from '@ice/store-next';

// 1️⃣ Create a custom hook as usual
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

// 2️⃣ Create the store
const store = createStore(models);

// 3️⃣ Consume model
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

## Advanced Usages

### Readonly

In some scenarios, you may only want to call the method returned by the model to update the state instead of subscribing to the update of the model state.
For example, the button component in the "Basic example", you do not consume the state of the model in the component, so you may not expect the change of the state of the model to trigger the re-rende of the component.

At this time, you can use the `getmodel` API, check following example and compare them with the above example:

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

### Model Interaction

In some scenarios, you might expect a state change of model A to trigger a state update of model B. We call this behavior as "Model Interaction".

For example:

- We have a todos model that records all tasks.
- We have a user model, in which there is a todos field, which records the number of tasks owned by the current user.
- Whenever the todos model's tasks changes, the number of tasks held by users needs to be kept in sync.

#### State subscription

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

#### Method Call

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

### Class Component Support

```tsx
import { Component } from 'react';
import store from '@/store';
import useTodos from '@/models/todos';

const { withModel } = store;

interface MapModelToProp {
  todos: ReturnType<typeof useTodos>; // This field is automatically added by withModel
}

interface CustomProp {
  title: string; // User defined props
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
                Remove
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
