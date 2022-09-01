import React from 'react';
import store from '../store';

const { getHook } = store;

export default function TodoAdd() {
  return (
    <input
      onKeyDown={(event) => {
        if (event.keyCode === 13) {
          const [, { add }] = getHook('useTodos');
          add({
            name: event.currentTarget.value,
          });
          event.currentTarget.value = '';
        }
      }}
      placeholder="Press Enter"
    />
  );
}
