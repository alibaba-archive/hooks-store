import { Component } from 'react';
import store from '../store';
import { TodoList as TodoListFn } from './TodoList';
import type useTodos from '../hooks/useTodos';

const { withHook } = store;

interface MapHooksToProp {
  useTodos: ReturnType<typeof useTodos>;
}

interface CustomProp {
  title: string;
}

type Props = CustomProp & MapHooksToProp;

// eslint-disable-next-line
class TodoList extends Component<Props> {
  onRemove = (index) => {
    const [, actions] = this.props.useTodos;
    actions.remove(index);
  };

  onToggle = (index) => {
    const [, actions] = this.props.useTodos;
    actions.toggle(index);
  };

  render() {
    const { title, useTodos } = this.props;
    const [state, , effectsState] = useTodos;
    return TodoListFn({
      state: { title, dataSource: state, subTitle: 'Class Component' },
      actions: { toggle: this.onToggle, remove: this.onRemove },
      effectsState,
    });
  }
}

export default withHook('useTodos')<MapHooksToProp, Props>(TodoList);
