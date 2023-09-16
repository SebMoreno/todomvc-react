import 'todomvc-app-css/index.css';
import { useState } from "react";
import { mockTodos } from "../../mocks/todos.ts";
import { Todo as TodoType } from "../../types.ts";
import { Todos } from "./Todos.tsx";
import { Header } from "./Header.tsx";
import { Footer } from "./Footer.tsx";

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
        <Footer/>
    </main>;
};
