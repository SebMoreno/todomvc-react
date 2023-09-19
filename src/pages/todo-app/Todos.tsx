import { Todo } from './Todo.tsx';
import { FilterValue, TODO_FILTERS } from '../../types.ts';
import { Todo as TodoType } from '../../types.ts';
import { FC, useState } from 'react';

interface TodosProps {
    todos: TodoType[];
    filterSelected: FilterValue;
    onDeleteTodo: (id: TodoType["id"]) => void;
    onTodoCompleted: (id: TodoType["id"], completed: TodoType["completed"]) => void;
    onChangeTodoTitle: (id: TodoType["id"], title: TodoType["title"]) => void;
}

export const Todos: FC<TodosProps> = ({
    todos,
    filterSelected,
    onDeleteTodo,
    onTodoCompleted,
    onChangeTodoTitle
}) => {
    const [idTodoEdited, setIdTodoEdited] = useState<TodoType["id"] | null>(null);

    if (filterSelected != TODO_FILTERS.ALL) {
        todos = todos.filter(todo => {
            if (filterSelected == TODO_FILTERS.ACTIVE) {
                return !todo.completed;
            } else if (filterSelected == TODO_FILTERS.COMPLETED) {
                return todo.completed;
            }
        });
    }

    return (
        <ul className="todo-list">
            {todos?.map(todo =>
                <li
                    key={todo.id}
                    className={`
                        ${todo.completed ? 'completed' : ''}
                        ${idTodoEdited === todo.id ? 'editing' : ''}
                    `}
                >
                    <Todo
                        completed={todo.completed}
                        title={todo.title}
                        isEditing={idTodoEdited === todo.id}
                        onEditingChange={isEditing => setIdTodoEdited(isEditing ? todo.id : null)}
                        onCompleted={completed => onTodoCompleted(todo.id, completed)}
                        onChangeTitle={title => onChangeTodoTitle(todo.id, title)}
                        onDelete={() => onDeleteTodo(todo.id)}
                    />
                </li>
            )}
        </ul>
    );
};
