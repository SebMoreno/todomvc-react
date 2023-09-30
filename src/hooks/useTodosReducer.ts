import { useEffect, useMemo, useReducer } from 'react';
import { TodoService } from '../services/todos';
import { FilterValue, Todo, TODO_FILTERS } from '../types';

type Action = { type: 'DELETE_COMPLETED' }
    | { type: 'DELETE_TODO', payload: { id: Todo["id"] } }
    | { type: 'CREATE_TODO', payload: { title: Todo["title"] } }
    | { type: 'UPDATE_TITLE', payload: Pick<Todo, "id" | "title"> }
    | { type: 'COMPLETE_TODO', payload: Pick<Todo, "id" | "completed"> }
    | { type: 'SET_TODOS', payload: { todos: Array<Todo> } }
    | { type: 'CHANGE_FILTER', payload: { filter: FilterValue } };

interface State {
    sync: boolean;
    todos: Array<Todo>;
    filterSelected: FilterValue;
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'DELETE_COMPLETED':
            return {
                ...state,
                sync: true,
                todos: state.todos.filter(todo => !todo.completed)
            };
        case 'DELETE_TODO':
            return {
                ...state,
                sync: true,
                todos: state.todos.filter(todo => todo.id !== action.payload.id)
            };
        case 'CREATE_TODO':
            return {
                ...state,
                sync: true,
                todos: [
                    ...state.todos,
                    {
                        id: crypto.randomUUID(),
                        title: action.payload.title,
                        completed: false
                    }
                ]
            };
        case 'UPDATE_TITLE':
            return {
                ...state,
                sync: true,
                todos: state.todos
                    .map(todo =>
                        todo.id !== action.payload.id
                            ? todo
                            : {...todo, title: action.payload.title}
                    )
            };
        case 'COMPLETE_TODO':
            return {
                ...state,
                sync: true,
                todos: state.todos
                    .map(todo =>
                        todo.id !== action.payload.id
                            ? todo
                            : {...todo, completed: action.payload.completed}
                    )
            };
        case 'SET_TODOS':
            return {
                ...state,
                sync: false,
                todos: action.payload.todos
            };
        case 'CHANGE_FILTER':
            return {
                ...state,
                sync: false,
                filterSelected: action.payload.filter
            };
        default:
            return state;
    }
};

const createInitialState = (todos?: Array<Todo>): State => ({
    sync: false,
    todos: todos ?? [],
    filterSelected: (() => {
        const params = new URLSearchParams(window.location.search);
        const filter = params.get('filter') as FilterValue | null;
        if (filter === null || !Object.values(TODO_FILTERS).includes(filter)) {
            return TODO_FILTERS.ALL;
        }
        return filter;
    })()
});
export const useTodosReducer = (initialTodos?: Array<Todo>): {
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
    const [{sync, todos, filterSelected}, dispatch] = useReducer(reducer, initialTodos, createInitialState);
    useEffect(() => {
        TodoService
            .getTodos()
            .then(todos => dispatch({type: 'SET_TODOS', payload: {todos}}))
            .catch(err => console.error(err));
    }, []);
    useEffect(() => {
        if (sync) {
            TodoService.setTodos(todos).catch(err => console.error(err));
        }
    }, [todos, sync]);
    const filteredTodos = useMemo(() => todos.filter(todo => {
        switch (filterSelected) {
            case TODO_FILTERS.ACTIVE:
                return !todo.completed;
            case TODO_FILTERS.COMPLETED:
                return todo.completed;
            case TODO_FILTERS.ALL:
            default:
                return true;
        }
    }), [todos, filterSelected]);
    const completedCount = todos.filter(todo => todo.completed).length;
    const activeCount = todos.length - completedCount;

    return {
        todos: filteredTodos,
        filterSelected,
        completedCount,
        activeCount,
        handleClearCompleted: () => dispatch({type: 'DELETE_COMPLETED'}),
        handleDeleteTodo: id => dispatch({type: 'DELETE_TODO', payload: {id}}),
        handleSave: title => dispatch({type: 'CREATE_TODO', payload: {title}}),
        handleTodoCompleted: (id, completed) => dispatch({type: 'COMPLETE_TODO', payload: {id, completed}}),
        handleChangeTodoTitle: (id, title) => dispatch({type: 'UPDATE_TITLE', payload: {id, title}}),
        handleFilterChange: filter => {
            dispatch({type: 'CHANGE_FILTER', payload: {filter}});
            const params = new URLSearchParams(window.location.search);
            params.set('filter', filter);
            window.history.pushState({}, '', `${window.location.pathname}?${params}`);
        }
    };
};
