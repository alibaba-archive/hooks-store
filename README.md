English | [简体中文](./README.zh-CN.md)

# hooks-store

> Lightweight React state management library based on React Hooks.

[![NPM version](https://img.shields.io/npm/v/@ice/hooks-store.svg?style=flat)](https://npmjs.org/package/@ice/hooks-store)
[![Package Quality](https://npm.packagequality.com/shield/@ice%2Fstore.svg)](https://packagequality.com/#?package=@ice/hooks-store)
[![build status](https://img.shields.io/travis/ice-lab/hooks-store.svg?style=flat-square)](https://travis-ci.org/ice-lab/hooks-store)
[![NPM downloads](http://img.shields.io/npm/dm/@ice/hooks-store.svg?style=flat)](https://npmjs.org/package/@ice/hooks-store)
[![Known Vulnerabilities](https://snyk.io/test/npm/@ice/hooks-store/badge.svg)](https://snyk.io/test/npm/@ice/hooks-store)
[![David deps](https://img.shields.io/david/ice-lab/hooks-store.svg?style=flat-square)](https://david-dm.org/ice-lab/hooks-store)

<table>
  <thead>
    <tr>
      <th colspan="5"><center>🕹 CodeSandbox demos 🕹</center></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://codesandbox.io/s/github/ice-lab/hooks-store/tree/master/examples/counter?module=/src/index.tsx">Counter</a></td>
      <td><a href="https://codesandbox.io/s/github/ice-lab/hooks-store/tree/master/examples/todos?module=/src/index.tsx">Todos</a></td>
    </tr>
  </tbody>
</table>

## Introduction

`hooks-store` is a lightweight React state management library based on hooks. It has the following core features:

* **Minimal & Familiar API**: No additional learning costs, easy to get started with the knowledge of React Hooks.
* **Centralization**: Easy to initialize data and support hooks interaction.
* **Readonly API**: Supports read-only state without subscribing to updates.
* **Great Compatibility**: Class Component Support && Perfect TypeScript Support.

## Basic example

```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from '@ice/hooks-store';

// 1️⃣ Create a custom hook as usual
function useCounter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  return {
    count,
    increment,
  };
}

const hooks = {
  useCounter,
};

// 2️⃣ Create the store
const store = createStore(hooks);

// 3️⃣ Consume hooks
const { useHooks } = store;
function Button() {
  const { increment } = useHooks('useCounter');
  return (
    <button type="button" onClick={increment}> + </button>
  );
}
function Count() {
  const { count } = useHooks('useCounter');
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

@ice/hooks-store requires React 16.8.0 or later.

```bash
npm install @ice/hooks-store --save
```

## Advanced Usages

### Readonly

In some scenarios, you may only want to call the method returned by the hooks to update the state instead of subscribing to the update of the hooks state.
For example, the button component in the "Basic example", you do not consume the state of the hooks in the component, so you may not expect the change of the state of the hooks to trigger the re-render of the component.

At this time, you can use the `getHooks` API, check following example and compare them with the above example:

```jsx
const { getHooks } = store;
function Button() {
  function handleIncrement() {
    getHooks('useCounter').increment();
  }
  return (
    <button type="button" onClick={handleIncrement}> + </button>
  );
}
```

### Hooks Interaction

In some scenarios, you might expect a state change of Hooks A to trigger a state update of Hooks B. We call this behavior as "Hooks Interaction".

For example:

- We have a useTodos Hooks that records all tasks.
- We have a useUser Hooks, in which there is a todos field, which records the number of tasks owned by the current user.
- Whenever the todos Hooks's tasks changes, the number of tasks held by users needs to be kept in sync.

#### State subscription

```js
import { useEffect, useState } from 'react';
import produce from 'immer';
import '@/store';

function useUser() {
  const [state, setState] = useState({ todos: 0 });
  const [todos] = store.useHooks('useTodos');

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

    const [, setUser] = store.getHooks('useUser');
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
import useTodos from '@/hooks/useTodos';

const { withHooks } = store;

interface MapHooksToProp {
  useTodos: ReturnType<typeof useTodos>; // This field is automatically added by withHooks
}

interface CustomProp {
  title: string; // User defined props
}

type Props = CustomProp & MapHooksToProp;

class Todos extends Component<Props> {
  render() {
    const { title, useTodos } = this.props;
    const [ state, actions ] = useTodos;
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

export default withHooks('useTodos')<MapHooksToProp, Props>(Todos);
```

## Browser Compatibility

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![UC](https://raw.github.com/alrra/browser-logos/master/src/uc/uc_48x48.png) |
| :--------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|✔ |✔|✔|9+ ✔|✔|✔|✔|

## Contributors

Feel free to report any questions as an [issue](https://github.com/alibaba/ice/issues/new), we'd love to have your helping hand on @ice/hooks-store.

If you're interested in @ice/hooks-store, see [CONTRIBUTING.md](https://github.com/alibaba/ice/blob/master/.github/CONTRIBUTING.md) for more information to learn how to get started.

## Community

| DingTalk community                               | GitHub issues |  Gitter |
|-------------------------------------|--------------|---------|
| <a href="https://ice.alicdn.com/assets/images/qrcode.png"><img src="https://ice.alicdn.com/assets/images/qrcode.png" width="150" /></a> | [issues]     | [gitter]|

[issues]: https://github.com/alibaba/ice/issues
[gitter]: https://gitter.im/alibaba/ice

## License

[MIT](LICENSE)
