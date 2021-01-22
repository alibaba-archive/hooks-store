import React from 'react';
import store from '../store';

const { getHooks } = store;

export default function TodoAdd() {
  console.debug('TodoAdd rending...');
  return (
    <input
      onKeyDown={(event) => {
        if (event.keyCode === 13) {
          const [, { add }] = getHooks('useTodos');
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
