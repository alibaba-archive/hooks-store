import React, { useEffect } from 'react';
import store from '../store';

const { useHook } = store;

export default function UserApp() {
  const [state, actions] = useHook('useUser');
  const { dataSource, auth, todos } = state;
  const { login } = actions;
  const { name } = dataSource;

  useEffect(() => {
    login();
  }, []);

  return auth ? (
    <div>
      <h2>
        User Information
      </h2>
      <ul>
        <li>Name：{name}</li>
        <li>Todos：{todos}</li>
      </ul>
    </div>
  ) : (
    <div>
      Not logged in
    </div>
  );
}
