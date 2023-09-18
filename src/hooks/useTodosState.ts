import { useState } from "react";
import { FilterValue, Todo } from "../types.ts";

export const useTodosState = (initialTodos: Array<Todo>): {
    activeCount: number
    completedCount: number
    todos: Array<Todo>
    filterSelected: FilterValue
    handleClearCompleted: () => void
    handleFilterChange: (filter: FilterValue) => void
    handleDeleteTodo: (id: Todo["id"]) => void
    handleSave: (title: Todo["title"]) => void
    handleTodoCompleted: (id: Todo["id"], completed: Todo["completed"]) => void
    handleChangeTodoTitle: (id: Todo["id"], title: Todo["title"]) => void
} => {
    const [todos, setTodos] = useState(initialTodos ?? []);
    const [activeCount, setActiveCount] = useState(todos.filter((todo: Todo) => todo.completed == false).length);
    const [completedCount, setCompletedCount] = useState(todos.filter((todo: Todo) => todo.completed == true).length);
    const [filterSelected, setFilterSelected] = useState('all' as FilterValue);

    return {
        activeCount: activeCount,
        completedCount: completedCount,
        todos,
        filterSelected: filterSelected,
        handleClearCompleted: () => {
            setTodos(todos.filter((todo) => todo.completed == false))
            setCompletedCount(0);
        },
        handleFilterChange: (filter) => {
            setFilterSelected(filter)
            
            if(filter != 'all')
                if(filter == 'completed')
                    setTodos(todos.filter((todo) => todo.completed == true))
                else
                    setTodos(todos.filter((todo) => todo.completed == false))
            else
                setTodos(todos);
        },
        handleTodoCompleted: (id, completed) => {
            setTodos(todos.map(todo => todo.id !== id ? todo : {...todo, completed}));

            if(completed == true)
            {
                setActiveCount(activeCount - 1);
                setCompletedCount(completedCount + 1);
            }
            else
            {
                setActiveCount(activeCount + 1);
                setCompletedCount(completedCount - 1);
            }
        },
        handleChangeTodoTitle: (id, title) => {
            setTodos(todos.map(todo => todo.id !== id ? todo : {...todo, title}));
        },
        handleDeleteTodo: id => {
            setTodos(todos.filter(todo => todo.id !== id));
        },
        handleSave: title => {
            setTodos([...todos, {id: crypto.randomUUID(), title, completed: false}]);
        }
    };
};
