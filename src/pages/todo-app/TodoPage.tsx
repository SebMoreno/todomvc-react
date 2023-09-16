import 'todomvc-app-css/index.css';
import { Todo } from "./Todo.tsx";
import { useState } from "react";
import { mockTodos } from "../../mocks/todos.ts";
import { Todo as TodoType } from "../../types.ts";
import { Todos } from "./Todos.tsx";

export const TodoPage = () => {
    const [todos, setTodos] = useState(mockTodos);

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
        <Todos
            todos={todos}
            onDeleteTodo={handleDeleteTodo}
            onTodoCompleted={handleTodoCompleted}
            onChangeTodoTitle={handleChangeTodoTitle}
        />
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
