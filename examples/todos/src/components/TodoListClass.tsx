import { Component } from 'react';
// import { UseModelValue } from '@ice/store-next';
// import compose from 'lodash/fp/compose';
import store from '../store';
import { TodoList as TodoListFn } from './TodoList';
// import todosModel from '../models/todos';

const { withModel } = store;

interface MapModelToProp {
  todos: any; // UseModelValue<typeof todosModel>;
}

interface CustomProp {
  title: string;
}

type Props = CustomProp & MapModelToProp;

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

export default withModel('todos')(TodoList);

// functional flavor:
// export default compose(withModelEffectsState('todos'), withModel('todos'))(TodoList);
