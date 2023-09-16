import 'todomvc-app-css/index.css';
import { Todo } from "./Todo.tsx";
import { useState } from "react";
import { mockTodos } from "../../mocks/todos.ts";

export const TodoPage = () => {
    const [todos, setTodos] = useState(mockTodos);

    return <main className="todoapp">
        <header className="header">
            <h1>todos</h1>
            <input className="new-todo" placeholder="¿Qué quieres hacer?" autoFocus/>
        </header>
        <ul className="todo-list">
            {todos.map(todo => <li className="" key={todo.id}>
                <Todo id={todo.id} completed={todo.completed} title={todo.title}/>
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
