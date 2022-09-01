import React from 'react';
import store from '../store';

const { useHook } = store;

export default function UserApp() {
  const [state] = useHook('useCar');
  const { logo } = state;

  return (
    <div>
      {logo}
    </div>
  );
}
