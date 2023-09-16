import { Todo } from "../types.ts";

export const mockAllCompletedTodos: Array<Todo> = [
    {
        id: "a123cf94-9108-460a-aba0-82f4c82487f2",
        title: "Learn TypeScript",
        completed: true
    },
    {
        id: "8f5a56d5-c6d5-418b-be03-cce4c00e8d65",
        title: "Learn React",
        completed: true
    },
    {
        id: "c55cfc3a-5612-49da-a85c-4079341d4f1b",
        title: "Define CSS styles",
        completed: true
    }
];

export const mockAllActiveTodos: Array<Todo> = [
    {
        id: "9f75da7f-6e46-4526-99dd-be34acf03af2",
        title: "Create an API",
        completed: false
    },
    {
        id: "0941ace4-b8de-4ac1-bce1-71a9de0737d7",
        title: "Connect the API with the frontend",
        completed: false
    },
    {
        id: "fc2ad6ff-52aa-404a-bdf2-82634f7f43c9",
        title: "Avoid useEffect infinite loops",
        completed: false
    }
];

export const mockTodos: Array<Todo> = [
    {
        id: "8f0226ba-f480-48f8-ab6d-8e7957117e4c",
        title: "Open a PR creating the filters feature",
        completed: false
    },
    {
        id: "2fac7de6-6bee-4fb4-8f8d-2d060092ee6a",
        title: "Learn how to use TypeScript with React",
        completed: true
    },
    {
        id: "0d8aa04e-b2a6-4eb3-a9b7-f7cdaeb4a23a",
        title: "Learn useReducer in React",
        completed: false
    }
];
