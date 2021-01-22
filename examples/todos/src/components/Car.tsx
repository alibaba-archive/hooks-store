import React from 'react';
import store from '../store';

const { useHooks } = store;

export default function UserApp() {
  const [ state ] = useHooks('useCar');
  const { logo } = state;

  console.debug('Car rending...');
  return (
    <div>
      {logo}
    </div>
  );
}
