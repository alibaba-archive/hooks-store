import React from 'react';
import store from '../store';

const { useHook } = store;

export function TodoList({ state, actions, effectsState }) {
  const { title, subTitle, dataSource } = state;
  const { toggle, remove } = actions;

  return (
    <div>
      <h2>{title}</h2>
      <p>
        Now is using {subTitle}.
      </p>
      <ul>
        {dataSource.map(({ name, done = false }, index) => (
          <li key={name}>
            <label>
              <input
                type="checkbox"
                checked={done}
                onChange={() => toggle(index)}
              />
              {done ? <s>{name}</s> : <span>{name}</span>}
            </label>
            {
              effectsState.remove.loading ?
                '...deleting...' :
                <button type="submit" onClick={() => remove(index)}>-</button>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ({ title }) {
  const [state, actions, effectsState] = useHook('useTodos');
  return TodoList(
    {
      state: { dataSource: state, title, subTitle: 'Function Component' },
      actions,
      effectsState,
    },
  );
}
