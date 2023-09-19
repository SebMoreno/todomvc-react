import { Todo } from "../types.ts";

export class TodoService {
    static async getTodos(): Promise<Todo[]> {
        return JSON.parse(localStorage.getItem('todos') ?? '[]');
    }

    static async setTodos(todos: Array<Todo>): Promise<void> {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

export const todos = await TodoService.getTodos();