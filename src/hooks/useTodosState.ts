import { useState, useEffect } from "react";
import { FilterValue, Todo } from "../types.ts";
import { TodoService } from "../services/todos.ts"

export const useTodosState = (): {
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
    const [todos, setTodos] = useState([] as Array<Todo>);
    const [areLoaded, setAreLoaded] = useState(false);
    const [activeCount, setActiveCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [filterSelected, setFilterSelected] = useState('all' as FilterValue);

    useEffect(() =>
    {
        TodoService.getTodos().then((todos) => 
        {
            setTodos(todos);
            setActiveCount(todos.filter((todo: Todo) => todo.completed === false).length);
            setCompletedCount(todos.filter((todo: Todo) => todo.completed).length);
            setAreLoaded(true);
        });
    }, [areLoaded]);

    return {
        activeCount: activeCount,
        completedCount: completedCount,
        todos,
        filterSelected: filterSelected,
        handleClearCompleted: () => 
        {
            const new_todos = todos.filter((todo) => todo.completed == false);
            setTodos(new_todos)
            setCompletedCount(0);
            TodoService.setTodos(new_todos).then()
        },
        handleFilterChange: (filter) => setFilterSelected(filter),
        handleTodoCompleted: (id, completed) => 
        {
            const new_todos = todos.map(todo => todo.id !== id ? todo : {...todo, completed});
            setTodos(new_todos);
            TodoService.setTodos(new_todos).then()
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
            const new_todos = todos.map(todo => todo.id !== id ? todo : {...todo, title});
            setTodos(new_todos);
            TodoService.setTodos(new_todos).then()
        },
        handleDeleteTodo: id => {
            const new_todos = todos.filter(todo => 
                {
                    if(todo.id === id) 
                        todo.completed ? setCompletedCount(completedCount - 1) : setActiveCount(activeCount - 1)
                    return todo.id !== id
                })
            setTodos(new_todos);
            TodoService.setTodos(new_todos).then()
        },
        handleSave: title => {
            const new_todos = [...todos, {id: crypto.randomUUID(), title, completed: false}];
            setTodos(new_todos);
            setActiveCount(activeCount + 1);
            TodoService.setTodos(new_todos).then()
        }
    };
};
