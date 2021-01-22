import { Component } from 'react';
import store from '../store';
import { TodoList as TodoListFn } from './TodoList';
import useTodos from '../hooks/useTodos';

const { withHooks } = store;

interface MapHooksToProp {
  todos: ReturnType<typeof useTodos>;
}

interface CustomProp {
  title: string;
}

type Props = CustomProp & MapHooksToProp;

class TodoList extends Component<Props> {
  onRemove = (index) => {
    const [, actions] = this.props.todos;
    actions.remove(index);
  }

  onToggle = (index) => {
    const [, actions] = this.props.todos;
    actions.toggle(index);
  }

  render() {
    const { title, todos } = this.props;
    const [ state, , effectsState ] = todos;
    return TodoListFn({
      state: { title, dataSource: state, subTitle: 'Class Component' },
      actions: { toggle: this.onToggle, remove: this.onRemove },
      effectsState,
    });
  }
}

export default withHooks('useTodos')<MapHooksToProp, Props>(TodoList);
