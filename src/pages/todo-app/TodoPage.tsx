import "../../../node_modules/todomvc-app-css/index.css";
import { Todos } from "./Todos.tsx";
import { Header } from "./Header.tsx";
import { Footer } from "./Footer.tsx";
import { useTodosState } from "../../hooks/useTodosState.ts";
// import { mockTodos, initTodos } from "../../mocks/todos.ts";
// import {useEffect} from "react"

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
    } = useTodosState();

    return <main className="todoapp">
        <Header title="todos" onCreateTodo={handleSave}/>
        <Todos
            todos={todos}
            activeFilter={filterSelected}
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
