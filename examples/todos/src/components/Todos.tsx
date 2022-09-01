import React, { useEffect } from 'react';
import store from '../store';
import TodoList from './TodoListClass';
// import TodoList from './TodoList';

const { useHook } = store;

export default function Todos() {
  const [dataSource, actions, effectsState] = useHook('useTodos');
  const { refresh } = actions;

  useEffect(() => {
    refresh();
  }, []);

  const noTaskView = <div>no task</div>;
  const loadingView = <div>loading...</div>;
  const taskView = dataSource.length ? <TodoList title="Todos" /> : noTaskView;

  return effectsState.refresh.loading ? loadingView : taskView;
}
