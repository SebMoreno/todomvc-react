import 'todomvc-app-css/index.css';
import { Todo } from "./Todo.tsx";
import { useState } from "react";
import { mockTodos } from "../../mocks/todos.ts";
import { Todo as TodoType } from "../../types.ts";

export const TodoPage = () => {
    const [todos, setTodos] = useState(mockTodos);
    const [idTodoEdited, setIdTodoEdited] = useState<TodoType["id"] | null>(null);

    function handleTodoCompleted(id: TodoType["id"], completed: TodoType["completed"]) {
        setTodos(todos.map(todo => todo.id !== id ? todo : {...todo, completed}));
    }

    function handleChangeTodoTitle(id: TodoType["id"], title: TodoType["title"]) {
        setTodos(todos.map(todo => todo.id !== id ? todo : {...todo, title}));
    }

    function handleDeleteTodo(id: TodoType["id"]) {
        setTodos(todos.filter(todo => todo.id !== id));
    }


    return <main className="todoapp">
        <header className="header">
            <h1>todos</h1>
            <input className="new-todo" placeholder="¿Qué quieres hacer?" autoFocus/>
        </header>
        <ul className="todo-list">
            {todos.map(todo =>
                <li className={`
                        ${todo.completed ? 'completed' : ''}
                        ${idTodoEdited === todo.id ? 'editing' : ''}
                     `} key={todo.id}>
                <Todo
                    completed={todo.completed}
                    title={todo.title}
                    isEditing={idTodoEdited === todo.id}
                    onEditingChange={isEditing => setIdTodoEdited(isEditing ? todo.id : null)}
                    onCompleted={completed => handleTodoCompleted(todo.id, completed)}
                    onChangeTitle={title => handleChangeTodoTitle(todo.id, title)}
                    onDelete={() => handleDeleteTodo(todo.id)}
                />
            </li>)}
        </ul>
        <footer className="footer">
            <span className="todo-count">4 tareas pendientes</span>
            <ul className="filters">
                <li><a href="/">Todas</a></li>
                <li><a className="selected" href="/">Activas</a></li>
                <li><a href="/">Completadas</a></li>
            </ul>
            <button className="clear-completed">Borrar completados</button>
        </footer>
    </main>;
};
