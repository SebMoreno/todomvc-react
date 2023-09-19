import 'todomvc-app-css/index.css';
import { useEffect } from 'react';
import { Todos } from "./Todos.tsx";
import { Header } from "./Header.tsx";
import { Footer } from "./Footer.tsx";
import { useTodosState } from "../../hooks/useTodosState.ts";
// import { mockTodos } from "../../mocks/todos.ts";
import { todos as saved_todos, TodoService } from "../../services/todos.ts";

export const TodoPage = () => {
    const {
        todos,
        activeCount,
        completedCount,
        filterSelected,
        handleSave,
        handleClearCompleted,
        handleFilterChange,
        handleDeleteTodo,
        handleTodoCompleted,
        handleChangeTodoTitle

    } = useTodosState(saved_todos);

    useEffect(() => {
        TodoService.setTodos(todos);
    }, [todos]);

    return <main className="todoapp">
        <Header title="todos" onCreateTodo={handleSave} />
        <Todos
            todos={todos}
            filterSelected={filterSelected}
            onDeleteTodo={handleDeleteTodo}
            onTodoCompleted={handleTodoCompleted}
            onChangeTodoTitle={handleChangeTodoTitle}
        />
        <Footer
            activeCount={activeCount}
            completedCount={completedCount}
            filterSelected={filterSelected}
            onFilterChange={handleFilterChange}
            onClearCompleted={handleClearCompleted}
        />
    </main>;
};
