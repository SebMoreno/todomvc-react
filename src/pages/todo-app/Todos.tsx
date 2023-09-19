import { Todo } from './Todo.tsx';
import { FilterValue, Todo as TodoType } from '../../types.ts';
import { FC, useState } from 'react';

interface TodosProps {
    todos: TodoType[];
    activeFilter: FilterValue;
    onDeleteTodo: (id: TodoType["id"]) => void;
    onTodoCompleted: (id: TodoType["id"], completed: TodoType["completed"]) => void;
    onChangeTodoTitle: (id: TodoType["id"], title: TodoType["title"]) => void;
}

export const Todos: FC<TodosProps> = ({
                                          todos,
                                          activeFilter,
                                          onDeleteTodo,
                                          onTodoCompleted,
                                          onChangeTodoTitle
                                      }) => {
    const [idTodoEdited, setIdTodoEdited] = useState<TodoType["id"] | null>(null);
    let filterBool: boolean;
    if(activeFilter == 'active')
        filterBool = false;
    else if(activeFilter == 'completed')
        filterBool = true;
    else
        filterBool = true;


    return (
        <ul className="todo-list">
            {todos.filter((todo) => { if(activeFilter == 'all') return 1; else return todo.completed == filterBool}).map(todo => 
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
                </li>)}
        </ul>
    );
};
