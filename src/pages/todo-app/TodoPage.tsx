import 'todomvc-app-css/index.css';
import { useState } from "react";
import { mockTodos } from "../../mocks/todos.ts";
import { Todo as TodoType } from "../../types.ts";
import { Todos } from "./Todos.tsx";
import { Header } from "./Header.tsx";

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

    function handleSave(title: TodoType["title"]) {
        setTodos([...todos, {id: crypto.randomUUID(), title, completed: false}]);
    }



    return <main className="todoapp">
        <Header title="todos" onCreateTodo={handleSave}/>
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
