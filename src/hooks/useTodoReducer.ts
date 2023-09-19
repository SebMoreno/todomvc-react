import { useReducer } from "react";
import { FilterValue, Todo } from "../types.ts";

interface TodoAction {
    type: string
    data?: {
        id?: Todo["id"]
        title?: Todo["title"]
        completed?: Todo["completed"]
    }
}

export const useTodoReducer = (initialTodos?: Array<Todo>): {
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
    const [todos, dispatchTodos] = useReducer((todos: Array<Todo>, action: TodoAction) => {
        switch (action.type) {
            case "handleClearCompleted":
                return todos.filter(todo => !todo.completed);

            case "handleDeleteTodo":
                return todos.filter(todo => todo.id !== action.data?.id);

            case "handleSave":
                let newTodo: Todo = {
                    id: crypto.randomUUID(),
                    title: action.data?.title ?? "",
                    completed: false
                }
                return [...todos, newTodo];

            case "handleTodoCompleted":
                return todos.map(todo => todo.id !== action.data?.id ? todo : {...todo, completed: action.data?.completed ?? false});

            case "handleChangeTodoTitle":
                return todos.map(todo => todo.id !== action.data?.id ? todo : {...todo, title: action.data?.title ?? ""});
        
            default:
                return todos;
        }        
    }, initialTodos ?? []);

    const [filterSelected, dispatchFilterSelected] = useReducer((state: FilterValue, action: {filtro: FilterValue}) => {
        if(state !== action.filtro){
            return action.filtro;
        }else{
            return state;
        }
    }, "all");

    let activeCount = todos.filter(todo => !todo.completed).length;
    let completedCount = todos.length - activeCount;

    return {
        activeCount: activeCount,
        completedCount: completedCount,
        todos: todos,
        filterSelected: filterSelected,
        handleClearCompleted: () => {
            dispatchTodos({type: "handleClearCompleted"});
        },
        handleFilterChange: filter => {
            dispatchFilterSelected({filtro: filter});
        },
        handleDeleteTodo: id => {
            dispatchTodos({type: "handleDeleteTodo", data: {id}});
        },
        handleSave: title => {
            dispatchTodos({type: "handleSave", data: {title: title}});
        },
        handleTodoCompleted: (id, completed) => {
            dispatchTodos({type: "handleTodoCompleted", data: {id: id, completed: completed}});
        },
        handleChangeTodoTitle: (id, title) => {
            dispatchTodos({type: "handleChangeTodoTitle", data: {id: id, title: title}});
        },
    };
}