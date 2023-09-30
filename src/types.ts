export interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

export const TODO_FILTERS = {
    ALL: "all",
    ACTIVE: "active",
    COMPLETED: "completed"
} as const;

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS];
export const colors = ["#2E86AB", "#A23B72", "#F18F01", "#C73E1D", "#3B1F2B"];

export type Player = "X" | "O";
export type BoardCells = Array<Player | null>;

export interface User {
    username: string,
    email: string
}
