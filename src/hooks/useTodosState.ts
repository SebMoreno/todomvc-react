import { useState, useEffect, useReducer, ReducerStateWithoutAction, ReducerAction, Reducer, ReducerState } from "react";
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
            if(completed === true)
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

interface StatesTodo
{
    activeCount: number;
    completedCount: number;
    todos: Array<Todo>;
    filterSelected: FilterValue;
    areLoaded: boolean;
}

interface ActionStatesTodo extends Partial<StatesTodo>
{
    type: string,
    todo_id?: string
    title?:string
    completed?: boolean
}

const ReducerFunction = (tasks: StatesTodo, dispatch_info: ActionStatesTodo): StatesTodo =>
{
    switch(dispatch_info.type)
    {
        case 'loaded':
        {
            return {
                ...tasks,
                areLoaded: true,
                todos: dispatch_info.todos ?? [],
                activeCount: dispatch_info.todos === undefined ? 0 : dispatch_info.todos.filter((todo: Todo) => todo.completed === false).length,
                completedCount: dispatch_info.todos === undefined ? 0: dispatch_info.todos.filter((todo: Todo) => todo.completed).length
            };
        }
        
        case 'cleared_completed':
        {
            const new_todos = tasks.todos.filter((todo: Todo) => todo.completed === false);
            TodoService.setTodos(new_todos).then()
            return {
                ...tasks,
                todos: new_todos,
                completedCount: 0
            }
        }

        case 'changed_filter':
        {
            return {
                ...tasks,
                filterSelected: dispatch_info.filterSelected?? 'all'
            };
        }

        case 'deleted_todo':
        {
            let completedCount = tasks.completedCount;
            let activeCount = tasks.activeCount;
            
            const new_todos = tasks.todos.filter(todo => 
                {
                    if(todo.id === dispatch_info.todo_id) 
                        todo.completed ? completedCount-- : activeCount++
                    return todo.id !== dispatch_info.todo_id
                })
            TodoService.setTodos(new_todos).then()
            return {
                ...tasks,
                todos: new_todos,
                activeCount: activeCount,
                completedCount: completedCount
            }
        }

        case 'saved_todo':
        {
            
            const newTodo: Todo =  {id: crypto.randomUUID(), title: dispatch_info.title ?? '', completed: false};
            TodoService.setTodos([...tasks.todos, newTodo]).then()
            return {
                ...tasks,
                todos: [...tasks.todos, newTodo],
                activeCount: tasks.activeCount + 1
            }
        }

        case 'completed_todo':
        {
            const new_todos = tasks.todos.map(todo => todo.id !== dispatch_info.todo_id ? todo : {...todo, completed: dispatch_info.completed?? false});
            let activeCount = tasks.activeCount;
            let completedCount = tasks.completedCount;

            TodoService.setTodos(new_todos).then()
            if(dispatch_info.completed == true)
            {
                activeCount--;
                completedCount++;
            }
            else
            {
                activeCount++
                completedCount--;
            }

            return {
                ...tasks,
                todos: new_todos,
                activeCount: activeCount,
                completedCount: completedCount
            }
        }

        case 'changed_title':
        {
            const new_todos = tasks.todos.map(todo => todo.id !== dispatch_info.todo_id ? todo : {...todo, title:dispatch_info.title?? ''});
            TodoService.setTodos(new_todos).then();
            return {
                ...tasks,
                todos: new_todos
            }
        }

        default:
            return tasks;
    }
}

export const useTodosReduce = (): {
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

    const [TodoStates, dispatch] = useReducer(ReducerFunction,
        {
            activeCount:0, 
            completedCount: 0, 
            todos: [] as Array<Todo>, 
            filterSelected: 'all' as FilterValue,
            areLoaded: false
        });

    useEffect(() =>
    {
        TodoService.getTodos().then((todos) => dispatch({type: 'loaded', todos: todos}));
    }, [TodoStates.areLoaded]);

    return {

        activeCount: TodoStates.activeCount,
        completedCount: TodoStates.completedCount,
        todos: TodoStates.todos,
        filterSelected: TodoStates.filterSelected,
        handleClearCompleted: () => dispatch({type: 'cleared_completed'}),
        handleFilterChange: (filter: FilterValue) => dispatch({type: 'changed_filter', filterSelected: filter}),
        handleDeleteTodo: (id: string) => dispatch({type: 'deleted_todo', todo_id: id}),
        handleSave: (title: string) => dispatch({type: 'saved_todo', title: title}),
        handleTodoCompleted: (id: string, completed: boolean) => dispatch({type: 'completed_todo', todo_id: id, completed: completed}),
        handleChangeTodoTitle: (id: string, title: string) => dispatch({type: 'changed_title', todo_id: id, title: title})
    }
}
