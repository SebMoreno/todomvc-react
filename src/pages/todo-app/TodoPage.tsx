import { FC, useEffect, useRef, useState } from "react";
import { Footer } from "./Footer.tsx";
import { Header } from "./Header.tsx";
import { Todos } from "./Todos.tsx";
import { useTodosReducer } from "../../hooks/useTodosReducer.ts";
import 'todomvc-app-css/index.css';
import { colors } from "../../types.ts";

export const TodoPage: FC = () => {
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
    } = useTodosReducer();
    const [color, setColor] = useState(colors[0]);
    const i = useRef(0);

    useEffect(() => {
        setColor(colors[i.current++ % colors.length]);
    }, [todos]);

    return (
        <div className="todoapp" style={{color}}>
            <Header title="todos" onCreateTodo={handleSave}/>
            <Todos
                todos={todos}
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
        </div>
    );
};
